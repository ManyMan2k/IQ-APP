"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

const HOW_IT_WORKS = [
  {
    title: "Faça um Teste",
    body: "Responda a perguntas curtas de lógica, padrões e raciocínio em poucos minutos.",
    icon: <ClipboardIcon />,
  },
  {
    title: "Receba o Seu Relatório Detalhado",
    body: "Veja como a sua mente processa problemas e compara com a média.",
    icon: <SparkIcon />,
  },
  {
    title: "Use a Sua Jornada",
    body: "Aplique o resultado em treinos, hábitos e desafios que fortalecem sua cognição.",
    icon: <MedalIcon />,
  },
];

const TESTS = [
  {
    title: "Teste de QI Inteligente",
    body: "39 perguntas com padrão crescente para medir rapidez, lógica e consistência.",
    cta: "Iniciar meu QI",
  },
  {
    title: "Traço de Personalidade",
    body: "Descubra tendências de decisão, foco, abertura mental e estilo comportamental.",
    cta: "Explorar",
  },
  {
    title: "Carreira",
    body: "Veja como seus pontos fortes se conectam com ambientes e desafios profissionais.",
    cta: "Praticar",
  },
];

const CAPABILITIES = [
  {
    number: "1",
    title: "Cursos em Vídeo com Especialistas",
    bullets: [
      "Aulas diretas sobre memória, raciocínio e tomada de decisão.",
      "Rotinas práticas para aprender mais rápido sem sobrecarga.",
      "Explicações simples para aplicar no dia a dia.",
    ],
  },
  {
    number: "2",
    title: "Jogos de Treino Cerebral",
    bullets: [
      "Desafios curtos para atenção, velocidade e flexibilidade mental.",
      "Sessões rápidas para encaixar na rotina sem atrito.",
      "Progresso contínuo com dificuldade gradual.",
    ],
  },
  {
    number: "3",
    title: "Puzzles",
    bullets: [
      "Exercícios de padrões, analogias e resolução visual.",
      "Treinos extras para ampliar consistência em testes cognitivos.",
      "Formato leve para praticar sem sensação de estudo pesado.",
    ],
  },
];

const OUTCOMES = [
  "Sua pontuação de QI personalizada e comparativo com a média.",
  "Perfil cognitivo com leitura mais clara dos seus pontos fortes.",
  "Plano de treino para atenção, memória e raciocínio.",
  "Painel com testes extras e biblioteca de desenvolvimento mental.",
];

const FAQS = [
  {
    q: "Como posso fazer o teste?",
    a: "Basta tocar em iniciar, responder às perguntas no seu ritmo e avançar até a tela de resultado.",
  },
  {
    q: "Será que meu resultado é confiável?",
    a: "O teste foi desenhado para medir padrões cognitivos de forma consistente e entregar um relatório comparativo claro.",
  },
  {
    q: "Quero cancelar a assinatura do myIQ",
    a: "Você pode gerenciar e cancelar sua assinatura pela sua conta quando quiser, sem burocracia.",
  },
  {
    q: "Posso acessar os treinos em vários dispositivos?",
    a: "Sim. O acesso funciona em celular, tablet e desktop, mantendo sua experiência sincronizada.",
  },
  {
    q: "O que vou obter nessa compra?",
    a: "Você libera pontuação, relatório pessoal, biblioteca de testes, treinos cerebrais e conteúdos educacionais.",
  },
];

const PRESS_LOGOS = [
  { src: "/brand/myiq/business-insider.svg", alt: "Business Insider", width: 136, height: 20 },
  { src: "/brand/myiq/digital-trends.svg", alt: "Digital Trends", width: 153, height: 28 },
  { src: "/brand/myiq/msn.svg", alt: "MSN", width: 73, height: 28 },
  { src: "/brand/myiq/newsweek.svg", alt: "Newsweek", width: 130, height: 28 },
  { src: "/brand/myiq/usa-today.svg", alt: "USA Today", width: 78, height: 28 },
  { src: "/brand/myiq/yahoo-finance.svg", alt: "Yahoo Finance", width: 150, height: 28 },
];

export default function StartPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(0);

  function beginQuiz() {
    router.push("/pt/quiz");
  }

  function openCheckout() {
    router.push("/pt/checkout");
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0f1720]">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-4 sm:px-6 lg:px-8">
        <Header />

        <section className="mt-4 overflow-hidden rounded-[30px] border border-[#dfe7f1] bg-white shadow-[0_24px_60px_rgba(79,109,148,0.12)]">
          <div className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:px-10">
            <div className="order-2 lg:order-1">
              <p className="mb-3 inline-flex items-center rounded-full border border-[#dfe7f2] bg-[#f8fbff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5d7393]">
                Teste Cognitivo Online
              </p>
              <h1 className="max-w-[14ch] text-[32px] font-black leading-[1.05] tracking-[-0.04em] text-[#11233b] sm:text-[44px]">
                Quer Conhecer a Sua Pontuação de QI?
              </h1>
              <p className="mt-4 max-w-[52ch] text-[14px] leading-6 text-[#5d6f86] sm:text-[15px]">
                Faça o teste validado mais popular da plataforma, receba seu relatório pessoal e
                descubra como desenvolver memória, foco e raciocínio com mais precisão.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={beginQuiz}
                  className="rounded-[14px] bg-[#0b7c78] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_24px_rgba(11,124,120,0.25)] transition hover:bg-[#0a6e6b]"
                >
                  Iniciar meu QI
                </button>
                <button
                  onClick={openCheckout}
                  className="rounded-[14px] border border-[#d9e5f1] bg-[#f8fbff] px-6 py-3.5 text-[15px] font-semibold text-[#46617f] transition hover:bg-[#eef5fc]"
                >
                  Entrar agora
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-[12px] text-[#7a8da7]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f8fc] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#0b7c78]" />
                  Resultado em minutos
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f8fc] px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#5c8df6]" />
                  Relatório detalhado
                </span>
              </div>
            </div>

            <div className="order-1 rounded-[28px] border border-[#e4ecf5] bg-[linear-gradient(180deg,#f9fbff_0%,#eef5ff_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:order-2">
              <ScoreChart />
            </div>
          </div>

          <div className="border-t border-[#e8eef6] px-5 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 opacity-75">
              <PressLogoRow logos={PRESS_LOGOS.slice(0, 2)} compact />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader
            title="Como Funciona"
            body="Uma experiência simples, rápida e estruturada para transformar um teste curto em leitura prática do seu perfil cognitivo."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <SurfaceCard key={item.title}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dbe7f3] bg-[#f8fbff] text-[#3564a5]">
                  {item.icon}
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#13243d]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#607389]">{item.body}</p>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            title="Testes Disponíveis"
            body="Explore avaliações pensadas para raciocínio, comportamento e evolução pessoal dentro do mesmo ecossistema."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {TESTS.map((item, index) => (
              <SurfaceCard key={item.title} className={index === 0 ? "border-[#d6e8e7] bg-[#fbfefe]" : ""}>
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex rounded-full border border-[#dbe6f2] bg-[#f6faff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#607b9d]">
                    {index === 0 ? "Mais procurado" : "Biblioteca"}
                  </div>
                  <span className="text-[11px] font-semibold text-[#90a3bb]">{index + 1}/3</span>
                </div>
                <h3 className="mt-4 text-[20px] font-bold tracking-[-0.04em] text-[#13243d]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#607389]">{item.body}</p>
                <button
                  onClick={beginQuiz}
                  className={`mt-6 w-full rounded-[14px] px-4 py-3 text-[14px] font-bold transition ${
                    index === 0
                      ? "bg-[#0b7c78] text-white hover:bg-[#0a6e6b]"
                      : "bg-[#d7ebea] text-[#1f555a] hover:bg-[#c8e0df]"
                  }`}
                >
                  {item.cta}
                </button>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            title="Potencialize as Suas Capacidades"
            body="A assinatura não entrega só um número. Ela abre uma rotina de treino e aprendizagem para manter sua mente afiada."
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <SurfaceCard key={item.number}>
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e6f5] bg-[#f5faff] text-[15px] font-bold text-[#1f5ca8]">
                  {item.number}
                </div>
                <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#13243d]">
                  {item.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-[14px] leading-6 text-[#5f7287]">
                      <CheckIcon />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            title="O Que Vai Obter"
            body="Tudo o que você precisa para entender melhor seu desempenho e continuar evoluindo depois do teste."
          />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OUTCOMES.map((item) => (
              <SurfaceCard key={item}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf2ff] text-[#2e63b3]">
                    <DiamondIcon />
                  </span>
                  <p className="text-[14px] leading-6 text-[#4d627b]">{item}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <SurfaceCard className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
            <SectionHeader
              title="Avaliações"
              body="Feedback real de quem usou a plataforma para testar, comparar e treinar o desempenho mental."
            />
            <div className="mt-5 rounded-[22px] border border-[#e2ebf4] bg-white p-5 shadow-[0_12px_24px_rgba(62,88,122,0.08)]">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    src="/brand/myiq/star.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                ))}
                <span className="ml-2 text-[12px] font-semibold text-[#00b67a]">Trustpilot</span>
              </div>
              <p className="mt-4 text-[16px] font-bold text-[#13243d]">
                “Achei rápido, bonito e objetivo. O relatório saiu claro e me deu vontade de continuar treinando.”
              </p>
              <p className="mt-3 text-[14px] leading-6 text-[#61748a]">
                Maria C., usuária ativa da plataforma, avaliou a experiência como simples de seguir e útil para acompanhar evolução cognitiva.
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="bg-[linear-gradient(180deg,#f9fbff_0%,#eef5ff_100%)]">
            <SectionHeader
              title="Comunidade"
              body="Milhares de pessoas fazem o teste todos os dias e usam a plataforma para treinar foco, memória e clareza mental."
            />
            <div className="mt-6 rounded-[22px] border border-[#dbe6f2] bg-white/85 p-5">
              <div className="flex rounded-full border border-[#dbe7f4] bg-[#f7fbff] p-1 text-[12px] font-semibold text-[#68809c]">
                <span className="flex-1 rounded-full bg-[#0b7c78] px-4 py-2 text-center text-white">Ativos</span>
                <span className="flex-1 px-4 py-2 text-center">Rankings</span>
                <span className="flex-1 px-4 py-2 text-center">Treinos</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <CommunityStat value="+30k" label="testes hoje" />
                <CommunityStat value="116" label="QI médio" />
                <CommunityStat value="4.1/5" label="avaliação" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBadge
                  icon="/brand/myiq/users.svg"
                  label="Comunidade ativa"
                  body="Pessoas comparando resultado, progresso e rotina de treino todos os dias."
                />
                <InfoBadge
                  icon="/brand/myiq/chat.svg"
                  label="Suporte em português"
                  body="Ajuda rápida para acesso, cobrança e uso da plataforma quando você precisar."
                />
              </div>
            </div>
          </SurfaceCard>
        </section>

        <section className="mt-12 rounded-[28px] border border-[#dde7f2] bg-white px-5 py-6 shadow-[0_18px_40px_rgba(62,88,122,0.08)] sm:px-7">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b95b3]">
            Destaques na mídia
          </p>
          <div className="mt-5">
            <PressLogoRow logos={PRESS_LOGOS} />
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            title="Explore os nossos planos"
            body="Acesso ao teste, relatório, biblioteca de avaliações e treinos contínuos em uma assinatura simples."
          />
          <div className="mt-5 rounded-[30px] border border-[#dce6f2] bg-white p-5 shadow-[0_24px_60px_rgba(79,109,148,0.12)] sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7390b2]">
                  Assinatura Mensal
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-[36px] font-black tracking-[-0.05em] text-[#11233b]">R$41,99</span>
                  <span className="pb-1 text-[14px] text-[#67809f]">/ mês</span>
                </div>
                <p className="mt-3 text-[14px] leading-6 text-[#607389]">
                  Inclui o relatório de QI, biblioteca de testes complementares, cursos rápidos e
                  treinos cerebrais para continuar evoluindo.
                </p>
                <button
                  onClick={beginQuiz}
                  className="mt-6 w-full rounded-[14px] bg-[#0b7c78] px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#0a6e6b]"
                >
                  Começar
                </button>
                <p className="mt-3 text-[11px] leading-5 text-[#8aa0b8]">
                  A assinatura renova automaticamente até ser cancelada. Cancelamento disponível na conta.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#e5edf5] bg-[#f8fbff] p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Relatório pessoal de QI",
                    "Testes extras de personalidade",
                    "Cursos de especialistas",
                    "Jogos de treino cerebral",
                    "Painel de progresso",
                    "Biblioteca premium",
                  ].map((item) => (
                    <div key={item} className="flex gap-2.5 rounded-2xl border border-white bg-white px-4 py-3 text-[14px] text-[#4f657f]">
                      <CheckIcon />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            title="Perguntas Frequentes"
            body="As respostas principais para começar com confiança e entender como funciona o acesso."
          />
          <div className="mt-5 space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = index === openFaq;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-[22px] border border-[#dde7f2] bg-white shadow-[0_12px_24px_rgba(62,88,122,0.05)]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-bold tracking-[-0.02em] text-[#13243d]">
                      {item.q}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f8fc] text-[#6d84a0]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-[14px] leading-6 text-[#607389]">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between rounded-[24px] border border-[#dfe7f1] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(85,112,147,0.08)] sm:px-5">
      <div className="flex items-center">
        <Image
          src="/brand/myiq/logo-mobile.svg"
          alt="myIQ"
          width={31}
          height={31}
          className="h-[31px] w-[31px] min-[361px]:hidden"
        />
        <Image
          src="/brand/myiq/logo-desktop.svg"
          alt="myIQ"
          width={108}
          height={31}
          className="hidden h-[31px] w-auto min-[361px]:block"
        />
      </div>
      <button
        type="button"
        aria-label="Abrir menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dce6f1] bg-[#f7fbff] text-[#3d526d]"
      >
        <MenuIcon />
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-12 overflow-hidden rounded-[30px] bg-[#08213a] px-5 py-8 text-[#dbe8f4] sm:px-7">
      <div className="flex items-center gap-3">
        <Image src="/brand/myiq/logo-desktop.svg" alt="myIQ" width={108} height={31} className="h-[28px] w-auto brightness-[3.4] contrast-[0.8]" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#89a6c3]">Apoio ao cliente</p>
          <p className="mt-3 text-[14px]">Como cancelar</p>
          <p className="mt-1 text-[14px]">Conta myIQ</p>
          <p className="mt-1 text-[14px]">Suporte 24/7</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#89a6c3]">Jurídico</p>
          <p className="mt-3 text-[14px]">Política de Privacidade</p>
          <p className="mt-1 text-[14px]">Termos e Condições</p>
          <p className="mt-1 text-[14px]">Política de Cookies</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#89a6c3]">Pagamentos</p>
          <p className="mt-3 text-[14px]">Visa</p>
          <p className="mt-1 text-[14px]">Mastercard</p>
          <p className="mt-1 text-[14px]">Apple Pay</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3 text-[#dce9f6]">
        <SocialCircle label="ig" />
        <SocialCircle label="f" />
        <SocialCircle label="t" />
      </div>

      <div className="mt-6 border-t border-white/10 pt-5 text-[11px] leading-5 text-[#9eb5cb]">
        Copyright © 2024-2026 myIQ. Envest Research Inc. 2093 Philadelphia Pike #3129, Claymont,
        DE 19703, United States. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function PressLogoRow({
  logos,
  compact = false,
}: {
  logos: Array<{ src: string; alt: string; width: number; height: number }>;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={compact ? "h-[20px] w-auto opacity-70" : "h-[18px] w-auto opacity-65 sm:h-[20px]"}
        />
      ))}
    </div>
  );
}

function SectionHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-[700px]">
      <h2 className="text-[28px] font-black tracking-[-0.05em] text-[#11233b] sm:text-[34px]">
        {title}
      </h2>
      <p className="mt-3 text-[14px] leading-6 text-[#61748a] sm:text-[15px]">{body}</p>
    </div>
  );
}

function SurfaceCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[26px] border border-[#dde7f2] bg-white p-5 shadow-[0_18px_40px_rgba(62,88,122,0.08)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function CommunityStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[18px] border border-[#e3ebf4] bg-[#fbfdff] px-4 py-4 text-center">
      <p className="text-[22px] font-black tracking-[-0.05em] text-[#13365c]">{value}</p>
      <p className="mt-1 text-[12px] text-[#68809c]">{label}</p>
    </div>
  );
}

function InfoBadge({ icon, label, body }: { icon: string; label: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-[18px] border border-[#e3ebf4] bg-[#fbfdff] px-4 py-4">
      <Image src={icon} alt="" width={24} height={24} className="mt-0.5 h-6 w-6 shrink-0" />
      <div>
        <p className="text-[14px] font-bold text-[#163255]">{label}</p>
        <p className="mt-1 text-[12px] leading-5 text-[#68809c]">{body}</p>
      </div>
    </div>
  );
}

function ScoreChart() {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/85 p-3 shadow-[0_18px_40px_rgba(84,120,173,0.15)]">
      <div className="rounded-[20px] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-3 sm:p-4">
        <div className="flex items-start justify-between text-[11px] font-semibold text-[#7990ad]">
          <span>LOW</span>
          <span>AVERAGE</span>
          <span>HIGH</span>
        </div>
        <svg viewBox="0 0 420 240" className="mt-2 w-full">
          <defs>
            <linearGradient id="curveGlow" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#3c8dff" />
              <stop offset="50%" stopColor="#0f6cff" />
              <stop offset="100%" stopColor="#3c8dff" />
            </linearGradient>
            <linearGradient id="fillCurve" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#9ac4ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9ac4ff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <g>
            {[0, 1, 2, 3].map((line) => (
              <line
                key={line}
                x1="18"
                x2="402"
                y1={44 + line * 44}
                y2={44 + line * 44}
                stroke="#e6edf7"
                strokeDasharray="5 7"
              />
            ))}
            {[55, 120, 210, 300, 365].map((x, index) => (
              <g key={x}>
                <line x1={x} x2={x} y1="24" y2="210" stroke="#edf2f9" />
                <text x={x} y="228" textAnchor="middle" fill="#88a0bc" fontSize="12" fontWeight="700">
                  {["70", "85", "100", "115", "130"][index]}
                </text>
              </g>
            ))}
          </g>
          <path
            d="M24 210 C 88 206, 124 150, 164 102 C 194 66, 214 28, 233 28 C 253 28, 272 66, 304 102 C 344 149, 376 204, 398 210"
            fill="none"
            stroke="url(#curveGlow)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M24 210 C 88 206, 124 150, 164 102 C 194 66, 214 28, 233 28 C 253 28, 272 66, 304 102 C 344 149, 376 204, 398 210 L398 210 L24 210 Z"
            fill="url(#fillCurve)"
          />
          <line x1="233" x2="233" y1="16" y2="210" stroke="#1d75ff" strokeWidth="3.5" />
          <circle cx="233" cy="28" r="7" fill="#1d75ff" />
          <text x="233" y="12" textAnchor="middle" fill="#1d75ff" fontSize="13" fontWeight="800">
            YOU
          </text>
          <text x="100" y="120" fill="#68809c" fontSize="12" fontWeight="700">
            34%
          </text>
          <text x="320" y="120" fill="#68809c" fontSize="12" fontWeight="700">
            24%
          </text>
          <text x="214" y="60" fill="#68809c" fontSize="12" fontWeight="700">
            68%
          </text>
        </svg>
      </div>
    </div>
  );
}

function SocialCircle({ label }: { label: string }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[13px] font-bold uppercase">
      {label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0">
      <circle cx="9" cy="9" r="9" fill="#e7f4f2" />
      <path d="M5 9L7.5 11.5L13 6" stroke="#0b7c78" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1.5L10.5 6L6 10.5L1.5 6L6 1.5Z" fill="#2d65b5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 9H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 13H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 4.5H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 3H15.5C16.328 3 17 3.672 17 4.5V6H7V4.5C7 3.672 7.672 3 8.5 3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 6H6.5C5.672 6 5 6.672 5 7.5V18.5C5 19.328 5.672 20 6.5 20H17.5C18.328 20 19 19.328 19 18.5V7.5C19 6.672 18.328 6 17.5 6H17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 15H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L13.4 8.1L18.5 9.5L13.4 10.9L12 16L10.6 10.9L5.5 9.5L10.6 8.1L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18.5 3.5L19.1 5.4L21 6L19.1 6.6L18.5 8.5L17.9 6.6L16 6L17.9 5.4L18.5 3.5Z" fill="currentColor" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 3H16L14 8H10L8 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11.5L12.8 13.1L14.5 13.3L13.25 14.5L13.55 16.2L12 15.35L10.45 16.2L10.75 14.5L9.5 13.3L11.2 13.1L12 11.5Z" fill="currentColor" />
    </svg>
  );
}
