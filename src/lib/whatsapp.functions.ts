import { createServerFn } from "@tanstack/react-start";

export type WhatsappSettings = { number: string | null; message: string };

export const DEFAULT_MESSAGE = "Olá! Vim pelo site e gostaria de atendimento.";

// Public read of the admin-configured WhatsApp contact (only these two keys).
export const getWhatsappSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<WhatsappSettings> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("site_settings")
        .select("key, value")
        .in("key", ["whatsapp_number", "whatsapp_message"]);
      if (error) throw error;
      const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
      return {
        number: map['whatsapp_number'] ?? null,
        message: map['whatsapp_message'] || DEFAULT_MESSAGE,
      };
    } catch (e) {
      console.error("getWhatsappSettings failed", e);
      return { number: null, message: DEFAULT_MESSAGE };
    }
  },
);
