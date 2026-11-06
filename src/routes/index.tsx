import { createFileRoute } from "@tanstack/react-router";
import {
  Headphones, Clock, Phone, ArrowUpRight, ClipboardList, BookOpenCheck, MessagesSquare,
  FileText, Receipt, Users, Building2, Landmark, ShieldCheck, Handshake, LineChart,
} from "lucide-react";
import duo from "@/assets/terminal_duo.png.asset.json";
import smart from "@/assets/terminal_smart.png.asset.json";
import office from "@/assets/escritorio_contabil.png.asset.json";
import { getWhatsappSettings } from "@/lib/whatsapp.functions";
import { waLink } from "@/lib/phone";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suporte Sumup Online — Icaro Mais Contabilidade" },
      { name: "description", content: "Atendimento humanizado Sumup e assessoria contábil, fiscal e trabalhista com processo, clareza e proximidade." },
      { property: "og:title", content: "Suporte Sumup Online — Icaro Mais Contabilidade" },
      { property: "og:description", content: "Atendimento humanizado Sumup e contabilidade orientada por processo." },
    ],
  }),
  loader: () => getWhatsappSettings(),
  component: Index,
});

const channels = [
  { icon: Headphones, label: "Atendimento Sumup", sub: "Fale com uma pessoa" },
  { icon: Clock, label: "Suporte 24hrs", sub: "Todos os dias" },
  { icon: Phone, label: "Telefone Sumup", sub: "Ligação direta" },
];

const pillars = [
  { icon: ClipboardList, t: "Organização", d: "Documentos, prazos e obrigações em um calendário único, com responsáveis definidos." },
  { icon: BookOpenCheck, t: "Clareza", d: "Relatórios explicados em linguagem objetiva, sem depender de interpretação técnica." },
  { icon: MessagesSquare, t: "Relacionamento", d: "Canal direto e acompanhamento contínuo, não apenas no fechamento." },
];

const steps = [
  { t: "Diagnóstico inicial", d: "Regime tributário, obrigações vigentes e situação documental." },
  { t: "Plano de trabalho", d: "Escopo, calendário de entregas e canais registrados por escrito." },
  { t: "Execução e conferência", d: "Apurações e obrigações com dupla conferência antes do envio." },
  { t: "Leitura dos números", d: "Resultados e pontos de atenção com recomendações práticas." },
];

const services = [
  { icon: FileText, t: "Contabilidade mensal" },
  { icon: Receipt, t: "Escrita fiscal" },
  { icon: Users, t: "Departamento pessoal" },
  { icon: Building2, t: "Abertura e alterações" },
  { icon: Landmark, t: "Planejamento tributário" },
  { icon: ShieldCheck, t: "Regularização" },
  { icon: Handshake, t: "Migração de escritório" },
  { icon: LineChart, t: "Apoio a gestores" },
];

function Index() {
  const { number, message } = Route.useLoaderData();
  const wa = (topic?: string) => waLink(number, topic ? `${message}\nAssunto: ${topic}` : message);
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-background/80 py-2 pl-6 pr-2 backdrop-blur-xl">
          <a href="#" className="leading-tight">
            <span className="block text-xs font-bold tracking-[0.2em]">SUPORTE SUMUP</span>
            <span className="block text-[10px] tracking-[0.2em] text-muted-foreground">ICARO MAIS CONTABILIDADE</span>
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {["Sobre", "Pilares", "Metodologia", "Serviços"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">{l}</a>
            ))}
          </div>
          <a href={wa("Solicitar proposta")} {...ext} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-transform hover:scale-[1.03]">
            Solicitar proposta
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden grid-lines pt-36 pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <span className="eyebrow">Atendimento humanizado</span>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Fale com a <span className="font-display font-normal italic">Sumup</span> do jeito certo.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">Escolha um canal abaixo e seja atendido por uma pessoa.</p>

            <div className="mt-10 space-y-3">
              {channels.map((c, i) => (
                <a key={c.label} href={wa(c.label)} {...ext}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${i === 0 ? "border-ink bg-ink text-ink-foreground shadow-float" : "border-border bg-background hover:border-foreground"}`}>
                  <span className={`grid size-11 place-items-center rounded-xl ${i === 0 ? "bg-ink-foreground/10" : "bg-muted"}`}>
                    <c.icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{c.label}</span>
                    <span className={`block text-xs ${i === 0 ? "opacity-60" : "text-muted-foreground"}`}>{c.sub}</span>
                  </span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-8 rounded-[3rem] bg-muted" />
            <img src={duo.url} alt="Maquininhas Sumup com impressora" className="relative mx-auto w-full max-w-lg animate-float" />
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="border-t border-border py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Sobre</span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Contabilidade orientada por <span className="font-display font-normal italic">processo</span> e proximidade.
            </h2>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border">
              <img src={office.url} alt="Escritório da Icaro Mais Contabilidade" loading="lazy" className="aspect-[4/3] w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
            </div>
          </div>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Escrituração contábil e fiscal, obrigações acessórias e rotina administrativa com informação organizada, prazos previsíveis e comunicação direta — sem jargão e sem surpresas.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border text-sm">
              <div className="bg-background p-5"><dt className="eyebrow">Razão social</dt><dd className="mt-2 font-medium">Icaro Mais Contabilidade LTDA</dd></div>
              <div className="bg-background p-5"><dt className="eyebrow">CNPJ</dt><dd className="mt-2 font-medium">20.089.182/0001-26</dd></div>
              <div className="col-span-2 bg-background p-5"><dt className="eyebrow">CRC-SP</dt><dd className="mt-2 font-medium">2SP041421/O-2</dd></div>
              <div className="col-span-2 bg-background p-5"><dt className="eyebrow">E-mail</dt><dd className="mt-2 break-all font-medium"><a href="mailto:adm@icarocontabilidade.com.br" className="hover:underline">adm@icarocontabilidade.com.br</a></dd></div>
              <div className="col-span-2 bg-background p-5"><dt className="eyebrow">Endereço</dt><dd className="mt-2 font-medium">Rua Hideo Suguiyama, 52, Parque Jabaquara — São Paulo/SP — CEP 04355-100</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pilares - dark */}
      <section id="pilares" className="relative bg-ink py-28 text-ink-foreground grid-lines-dark">
        <div className="mx-auto max-w-6xl px-6">
          <span className="eyebrow">Pilares</span>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Três compromissos que <span className="font-display font-normal italic">sustentam</span> o trabalho.
          </h2>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink-foreground/10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.t} className="bg-ink p-10 transition-colors hover:bg-ink-foreground/5">
                <div className="flex items-center justify-between">
                  <p.icon className="size-6" />
                  <span className="font-display text-3xl italic opacity-40">0{i + 1}</span>
                </div>
                <h3 className="mt-12 text-2xl font-semibold">{p.t}</h3>
                <p className="mt-3 leading-relaxed opacity-60">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section id="metodologia" className="py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-x-6 bottom-0 top-16 rounded-[3rem] bg-ink" />
            <img src={smart.url} alt="Smartphone Sumup" className="relative mx-auto w-full max-w-sm" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow">Metodologia</span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Um caminho <span className="font-display font-normal italic">previsível</span>, do contato ao fechamento.
            </h2>
            <ol className="mt-12 border-t border-border">
              {steps.map((s, i) => (
                <li key={s.t} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b border-border py-6">
                  <span className="font-display text-4xl italic text-muted-foreground transition-colors group-hover:text-foreground">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1 text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="serviços" className="border-t border-border py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Serviços</span>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Escopo <span className="font-display font-normal italic">completo</span> para sua empresa.
              </h2>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {services.map((s) => (
              <a key={s.t} href={wa(s.t)} {...ext} className="group flex aspect-square flex-col justify-between rounded-3xl border border-border bg-background p-6 transition-all hover:bg-ink hover:text-ink-foreground">
                <s.icon className="size-6" />
                <div className="flex items-end justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{s.t}</h3>
                  <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="px-4 pb-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-ink px-8 py-20 text-center text-ink-foreground grid-lines-dark md:px-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Pronto para ser <span className="font-display font-normal italic">bem atendido</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-md opacity-60">Escolha um canal e fale com nossa equipe agora.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={wa("Solicitar proposta")} {...ext} className="rounded-full bg-ink-foreground px-7 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.03]">Solicitar proposta</a>
            <a href="#metodologia" className="rounded-full border border-ink-foreground/25 px-7 py-3.5 font-semibold transition-colors hover:bg-ink-foreground/10">Conhecer a metodologia</a>
          </div>
        </div>
        <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 text-xs text-muted-foreground">
          <span>© 2026 Icaro Mais Contabilidade LTDA</span>
          <span>CNPJ 20.089.182/0001-26 · CRC-SP 2SP041421/O-2</span>
        </footer>
      </section>
    </div>
  );
}
