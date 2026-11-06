import { createFileRoute } from "@tanstack/react-router";
import { normalizePhone } from "@/lib/phone";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

async function deriveSecret(key: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`telegram-webhook:${key}`));
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function reply(chatId: number, text: string) {
  const res = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env['LOVABLE_API_KEY']}`,
      "X-Connection-Api-Key": process.env['TELEGRAM_API_KEY']!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
  if (!res.ok) console.error(`Telegram reply failed [${res.status}]: ${await res.text()}`);
}

const HELP =
  "<b>Painel do site</b>\n\n" +
  "/whatsapp 41999999999 — define o número\n" +
  "/mensagem Olá, vim pelo site — define a mensagem inicial\n" +
  "/status — mostra a configuração atual\n\n" +
  "Você também pode enviar só o número.";

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env['TELEGRAM_API_KEY'];
        if (!key) return new Response("Not configured", { status: 500 });
        const got = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
        if (!safeEqual(got, await deriveSecret(key))) return new Response("Unauthorized", { status: 401 });

        const update = await request.json().catch(() => null);
        const msg = update?.message;
        const chatId: number | undefined = msg?.chat?.id;
        const text: string = (msg?.text ?? "").trim();
        if (!chatId || !text) return Response.json({ ok: true });

        const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");

        // Admin: the first chat to talk to the bot becomes the only admin.
        const { data: admins, error: aErr } = await db.from("telegram_admins").select("chat_id");
        if (aErr) return Response.json({ error: aErr.message }, { status: 500 });
        let isAdmin = (admins ?? []).some((a) => Number(a.chat_id) === chatId);
        if (!admins?.length) {
          const { error } = await db.from("telegram_admins").insert({ chat_id: chatId });
          if (error) return Response.json({ error: error.message }, { status: 500 });
          isAdmin = true;
          await reply(chatId, "✅ Você agora é o administrador do site.");
        }
        if (!isAdmin) {
          await reply(chatId, "⛔ Acesso restrito ao administrador.");
          return Response.json({ ok: true });
        }

        const [cmdRaw, ...rest] = text.split(/\s+/);
        const cmd = (cmdRaw ?? "").toLowerCase().replace(/@.*$/, "");
        const arg = rest.join(" ").trim();

        const save = async (k: string, v: string) => {
          const { error } = await db
            .from("site_settings")
            .upsert({ key: k, value: v, updated_at: new Date().toISOString() });
          return error;
        };

        if (cmd === "/whatsapp" || (!cmd.startsWith("/") && normalizePhone(text))) {
          const phone = normalizePhone(cmd === "/whatsapp" ? arg : text);
          if (!phone) {
            await reply(chatId, "❌ Número inválido. Exemplo: /whatsapp 41999999999");
          } else {
            const err = await save("whatsapp_number", phone);
            await reply(chatId, err ? `❌ Erro ao salvar: ${err.message}` : `✅ WhatsApp atualizado: +${phone}\nTodos os botões do site já apontam para ele.`);
          }
        } else if (cmd === "/mensagem") {
          if (!arg || arg.length > 500) {
            await reply(chatId, "❌ Envie uma mensagem de até 500 caracteres. Ex: /mensagem Olá, vim pelo site");
          } else {
            const err = await save("whatsapp_message", arg);
            await reply(chatId, err ? `❌ Erro ao salvar: ${err.message}` : "✅ Mensagem inicial atualizada.");
          }
        } else if (cmd === "/status") {
          const { data } = await db.from("site_settings").select("key, value");
          const m = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
          await reply(
            chatId,
            `<b>Configuração atual</b>\nWhatsApp: ${m['whatsapp_number'] ? "+" + m['whatsapp_number'] : "não definido"}\nMensagem: ${m['whatsapp_message'] ?? "padrão"}`,
          );
        } else {
          await reply(chatId, HELP);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
