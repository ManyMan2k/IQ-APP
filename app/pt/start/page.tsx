"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, type ReactNode } from "react";

/* ─────────────── DATA ─────────────── */

const HOW_IT_WORKS = [
  {
    title: "Faça um Teste",
    body: "Tenha uma visão imparcial de si mesmo",
    icon: <ClipboardIcon />,
  },
  {
    title: "Receba Seu Relatório Detalhado",
    body: "Conheça seus pontos fortes e descubra áreas para crescer",
    icon: <NodesIcon />,
  },
  {
    title: "Inicie Sua Jornada",
    body: "Comece a evoluir com cursos especializados e treinamento cerebral",
    icon: <RocketIcon />,
  },
];

const TESTS = [
  {
    title: "Teste de QI / Inteligência",
    time: "15 minutos",
    questions: "25 questões",
    cta: "Iniciar Teste de QI",
    enabled: true,
    icon: <BrainIcon />,
  },
  {
    title: "Tipo de Personalidade",
    time: "20 minutos",
    questions: "90 questões",
    cta: "Iniciar Teste de Personalidade",
    enabled: false,
    icon: <HeadThinkIcon />,
  },
  {
    title: "Carreira",
    time: "25 minutos",
    questions: "35 questões",
    cta: "Em Breve",
    enabled: false,
    icon: <LightbulbIcon />,
  },
];

const CAPABILITIES = [
  {
    number: "1",
    title: "Videocursos com Especialistas",
    bullets: [
      "Mais de 20 horas de cursos",
      "Aulas fáceis de acompanhar",
      "Aprenda no seu próprio ritmo",
      "Acompanhe seu progresso",
    ],
  },
  {
    number: "2",
    title: "Jogos de Treinamento Cerebral",
    bullets: [
      "Exercícios cognitivos variados",
      "Níveis de dificuldade progressivos",
      "Aprimore 5 habilidades mentais essenciais: memória, raciocínio lógico, domínio da resolução de problemas, foco e concentração.",
    ],
  },
  {
    number: "3",
    title: "Quebra-Cabeças",
    bullets: [
      "Mais de 150 quebra-cabeças para turbinar a inteligência",
      "Progressão inteligente de dificuldade",
      "Domine funções cerebrais essenciais: reconhecimento de padrões, pensamento estratégico e raciocínio analítico.",
    ],
  },
];

const OUTCOMES = [
  "Sua pontuação de QI com análise detalhada do seu desempenho",
  "Perfil cognitivo completo revelando seus pontos fortes e padrões de pensamento naturais",
  "Exercícios cerebrais para explorar suas capacidades mentais",
  "Mais testes sobre carreira, relacionamentos e desenvolvimento pessoal",
  "Desafios avançados de raciocínio criados para revelar como você resolve problemas",
];

const FAQS = [
  {
    q: "E se eu não estiver satisfeito com o programa?",
    a: (
      <>
        Temos certeza de que você vai reconhecer o valor e os benefícios do myIQ, mas se não estiver satisfeito ou tiver problemas técnicos, pode ser elegível para um reembolso. Consulte nossa <a href="#" className="underline transition hover:text-[rgb(44,51,69)]">Política de Reembolso</a> para saber mais.
      </>
    ),
  },
  {
    q: "Como cancelo minha assinatura?",
    a: (
      <>
        Cancelar é simples e leva menos de alguns minutos. Visite nosso <a href="#" className="underline transition hover:text-[rgb(44,51,69)]">Centro de Ajuda</a> e siga as instruções. Você manterá o acesso até o fim do período de cobrança atual.
      </>
    ),
  },
  {
    q: "Quanto tempo leva o teste de QI?",
    a: "Nosso teste de QI leva até 20 minutos para ser concluído. Você pode pular perguntas e retornar a elas antes de enviar suas respostas. Para obter resultados mais precisos, recomendamos reservar um tempo sem interrupções antes de começar.",
  },
  {
    q: "Posso refazer os testes?",
    a: "Sim! Você pode refazer os testes após concluir os módulos de treinamento recomendados, para acompanhar seu progresso e evolução ao longo do tempo.",
  },
  {
    q: "Posso acessar o myIQ em vários dispositivos?",
    a: "Sim! Sua assinatura funciona em todos os dispositivos — smartphones, tablets e computadores. Seu progresso é sincronizado automaticamente em todos os lugares onde você fizer login.",
  },
  {
    q: "Meus dados estão seguros?",
    a: (
      <>
        Levamos sua privacidade muito a sério. Seus dados são armazenados com segurança e em conformidade com toda a legislação aplicável. Os dados são criptografados com segurança de nível bancário e nunca compartilhamos suas informações pessoais com terceiros. Suas informações de pagamento são processadas de acordo com os padrões da indústria PCI-DSS. Saiba mais em nossa <a href="#" className="underline transition hover:text-[rgb(44,51,69)]">Política de Privacidade</a>.
      </>
    ),
  },
];

const PRESS_LOGOS = [
  { src: "/images/svgexport-6.svg", alt: "Digital Trends", width: 153, height: 28 },
  { src: "/images/svgexport-7.svg", alt: "MSN", width: 73, height: 28 },
  { src: "/images/svgexport-8.svg", alt: "Newsweek", width: 130, height: 28 },
  { src: "/images/svgexport-9.svg", alt: "USA Today", width: 78, height: 28 },
  { src: "/images/svgexport-10.svg", alt: "Yahoo Finance", width: 150, height: 28 },
  { src: "/images/svgexport-5.svg", alt: "Business Insider", width: 192, height: 28 },
];

type Review = { stars: number; body: string; name: string; time: string };

const REVIEWS: Review[] = [
  { stars: 5, body: "Me ajudou a entender o meu QI.", name: "godgmail.com", time: "há 15 horas" },
  { stars: 5, body: "Nunca tinha feito o teste. Nunca é tarde. Foi muito bom", name: "Leonardo De Souza Fulop", time: "há 16 horas" },
  { stars: 5, body: "O texte num todo", name: "ce.wmartinsgmail.com", time: "há 17 horas" },
  { stars: 5, body: "Muito bom, gostei do teste.", name: "rrs.gmail.com", time: "há 18 horas" },
  { stars: 5, body: "Incrivel e surpeendente. Nao sabia nada sobre mei QI. Grata.", name: "benearagaogmail.com", time: "há 19 horas" },
  { stars: 5, body: "Ainda não acredito. 124 e tomo tanta decisão errada....", name: "fernandajoziasgmail.com", time: "há 19 horas" },
  { stars: 5, body: "As perguntas objetivas", name: "Verônica", time: "há 20 horas" },
  { stars: 5, body: "Excelente!", name: "Rodrigo Leonardo Kill", time: "há 20 horas" },
  { stars: 4, body: "Retira a duvida sobre alguns pontos relacionados a mim e trouxe uma observação sobre procurar algum processo de ajuda para continuar", name: "yuricainagmail.com", time: "ontem" },
  { stars: 5, body: "Adorei o teste, não demorou, preço muito baixo, ótima experiência, recomendo muito", name: "yagoportellagmail.com", time: "ontem" },
  { stars: 5, body: "Perguntas muito boas", name: "presentes.mimosoutlook.com", time: "há 10 horas" },
  { stars: 5, body: "Oportunidade, expressão de desempenho e sensação de apoderamento.", name: "flaviagomesnevesgmail.com", time: "há 22 horas" },
  { stars: 5, body: "Facilidade de uso, perguntas diretas e objetivas e resultado bem apresentado.", name: "Mario Luiz", time: "ontem" },
  { stars: 3, body: "Pra mim foi só uma brincadeira.", name: "zaqueu Pinheiro", time: "ontem" },
  { stars: 3, body: "Quero meu dinheiro de volta. Só queria um teste rápido e não ter que fazer pagamentos automáticos recorrentes.", name: "Ana R", time: "anteontem" },
  { stars: 5, body: "Paguei pra ver quanto \"qi\" eu tenho, não sei se uma pessoa inteligente faria isso, e msm assim segundo o teste fiquei acima da média. Sobre o teste achei meio sem sentido, hahaha 😜", name: "googlsilvagmail.com", time: "ontem" },
  { stars: 3, body: "Nao sei se acredito", name: "carbsoniagmail.com", time: "anteontem" },
  { stars: 3, body: "Gerou um pix automático semanal do valor pago para ter o resultado", name: "danielazuzagmail.com", time: "há 4 dias" },
];

/* ─────────────── PAGE ─────────────── */

export default function StartPage() {
  const router = useRouter();
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  function beginQuiz() {
    router.push("/pt/quiz");
  }

  function openCheckout() {
    router.push("/pt/checkout");
  }

  function scrollToPlans() {
    document.getElementById("explore-plans")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-white text-[rgb(13,13,14)]">
      {/* ── 1. NAVBAR ── */}
      <Navbar onLogin={openCheckout} onStart={beginQuiz} />

      {/* ── 2. HERO SECTION ── */}
      <section className="relative z-0 flex h-full w-full flex-col pt-14 lg:pt-[84px]">
        {/* Background gradient */}
        <div className="absolute -left-1/2 top-0 z-[-1] h-full w-[200vw] bg-gradient-to-b from-white via-[#EBF4FF] to-white" />

        <div className="mx-auto flex h-full w-full max-w-7xl flex-col-reverse items-center gap-5 px-4 lg:flex-row lg:justify-between max-[1320px]:px-6 max-md:px-4">
          {/* Left column: text + buttons */}
          <div className="flex w-full max-w-[630px] flex-col gap-3 lg:gap-4">
            <h1 className="text-[32px] font-extrabold leading-[40px] lg:text-[48px] lg:leading-[62px]">
              <span className="inline-block bg-gradient-to-r from-[#2C3345] to-[#424D6A] bg-clip-text text-transparent">Quer Saber Seu&nbsp;</span>
              <br className="max-lg:hidden" />
              <span className="inline-block bg-gradient-to-r from-[#27415F] via-[#007AFF] to-[#007AFF] bg-clip-text pr-2 text-transparent">Pontuação de QI?</span>
            </h1>

            <p className="text-base leading-[25px] text-[#2B2D42] lg:max-w-[325px] lg:text-[18px]">
              Faça nosso teste de QI e descubra seu caminho para o autoconhecimento e desenvolvimento
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:mt-6">
              <button
                onClick={beginQuiz}
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#0D766E] px-8 text-[16px] font-semibold text-white transition hover:bg-[#0A645D] sm:w-auto"
              >
                Iniciar Teste de QI
                <svg className="hidden sm:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
              <button
                onClick={scrollToPlans}
                className="flex h-[48px] w-full items-center justify-center rounded-[12px] border border-[#0D766E] px-8 text-[16px] font-semibold text-[#0D766E] transition hover:bg-[#0D766E]/5 sm:w-auto"
              >
                Veja os preços
              </button>
            </div>
          </div>

          {/* Right column: bell curve SVG */}
          <div className="relative mx-auto flex aspect-[517/296] h-full w-full max-w-[517px] items-center justify-center max-lg:mt-[-28px]">
            <BellCurveSVG />
          </div>
        </div>

        {/* ── 4. LOGO MARQUEE ── */}
        <div className="absolute bottom-[-65px] w-full overflow-hidden px-6 lg:bottom-[-100px]">
          <LogoMarquee />
        </div>
      </section>

      {/* ── 5. COMO FUNCIONA ── */}
      <section id="how-it-works" className="w-full pb-6 pt-[120px] md:pb-10 lg:pt-[174px]">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[32px] font-semibold text-[rgb(43,45,66)] md:text-[36px]">
            Como Funciona
          </h2>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.title}
                className="flex-1 rounded-[14px] border border-[rgb(217,231,255)] bg-white p-4 md:p-6"
              >
                <div className="mb-4 text-[rgb(151,180,217)]">{item.icon}</div>
                <h3 className="text-[16px] font-semibold text-[rgb(13,13,14)] md:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[rgb(100,110,130)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTES DISPONÍVEIS ── */}
      <section id="available-tests" className="relative z-0 py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[32px] font-semibold text-[rgb(43,45,66)] md:text-[36px]">
            Testes Disponíveis
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-center text-[16px] leading-relaxed text-[rgb(120,130,145)]">
            Cada teste revela uma nova parte de você. Comece pela inteligência, com mais testes chegando em breve
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">

            {TESTS.map((test, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={test.title}
                  className="flex flex-col rounded-[14px] border border-[rgb(217,231,255)] bg-white p-4 md:p-6"
                >
                  <div className="mb-4 text-[rgb(151,180,217)]">{test.icon}</div>
                  <h3 className="text-[16px] font-semibold text-[rgb(13,13,14)] md:text-[18px]">
                    {test.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-[13px] text-[rgb(120,130,145)]">
                    <span className="flex items-center gap-1">
                      <ClockIcon /> {test.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <DocIcon /> {test.questions}
                    </span>
                  </div>
                  <div className="mt-auto pt-5">
                    <button
                      onClick={isFirst ? beginQuiz : undefined}
                      disabled={!isFirst}
                      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[15px] font-semibold transition ${
                        isFirst
                          ? "bg-[#0D766E] text-white hover:bg-[#0A645D]"
                          : "bg-[#87B4B1] text-white cursor-not-allowed"
                      }`}
                    >
                      {isFirst ? (
                        <>
                          Iniciar Teste de QI
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </>
                      ) : (
                        "Em Breve"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. POTENCIE AS SUAS CAPACIDADES ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[36px] font-bold text-[rgb(13,13,14)] md:text-[40px]">
            Potencialize Suas Habilidades
          </h2>
          <p className="mx-auto mt-3 max-w-[550px] text-center text-[16px] leading-relaxed text-[rgb(120,130,145)]">
            Desbloqueie seu potencial com nosso pacote de treinamento completo
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.number}
                className="rounded-[14px] border border-[rgb(217,231,255)] bg-white p-4 md:p-6"
              >
                {/* Numbered circle with gradient border */}
                <div
                  className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-full p-[3px]"
                  style={{
                    background: "linear-gradient(to right, #007AFF, #7CB7F8)",
                  }}
                >
                  <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white text-[20px] font-semibold text-[rgb(43,45,66)]">
                    {cap.number}
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-[rgb(13,13,14)] md:text-[18px]">
                  {cap.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {cap.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[rgb(100,110,130)]"
                    >
                      <Image src="/images/svgexport-19.svg" alt="" width={20} height={20} className="mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. O QUE VAI OBTER ── */}
      <section className="relative py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "#F6FBFF" }} />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[32px] font-semibold text-[rgb(43,45,66)] md:text-[36px]">
            O Que Você Vai Obter
          </h2>
          <div className="mt-8 flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {OUTCOMES.map((item, i) => (
              <div
                key={i}
                className="flex min-w-[220px] max-w-[280px] flex-shrink-0 flex-col rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#007AFF]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[14px] font-medium leading-relaxed text-[rgb(43,45,66)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AVALIAÇÕES ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[32px] font-bold text-[rgb(43,45,66)] md:text-[36px]">
            Avaliações
          </h2>
          <ReviewsCarousel reviews={REVIEWS} />
          <div className="mt-6 text-center text-[15px] text-[#191919]">
            <p>
              Classificação <strong>4.1</strong> / 5 com base em <a href="#" className="font-semibold underline underline-offset-2">130.610 avaliações</a>.
            </p>
            <p className="mt-1">
              Exibindo nossas avaliações de 3, 4 e 5 estrelas.
            </p>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <Image src="/images/svgexport-24.svg" alt="Trustpilot" width={28} height={28} className="h-7 w-7 text-[#00b67a]" />
              <span className="text-[22px] font-bold tracking-tight text-[#191919]">Trustpilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. COMUNIDADE ── */}
      <section className="relative z-0 flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:py-16 mx-auto max-w-7xl px-4 md:px-6">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-[200vw] -translate-x-1/2 bg-[#F6FBFF]" />
        
        <div className="flex flex-col items-center justify-center gap-2 md:items-start">
          <h2 className="text-[32px] font-bold text-[rgb(43,45,66)] md:text-[36px]">
            Comunidade
          </h2>
          <p className="text-[16px] text-[rgb(43,45,66)]">
            Siga-nos nas redes sociais para quizzes diários, desafios e charadas para manter sua mente afiada
          </p>
        </div>
        
        <div className="flex w-full max-w-[400px] justify-center gap-4 md:w-auto">
          <a
            href="#"
            className="flex flex-1 items-center justify-center rounded-[12px] border border-[#007AFF] bg-white py-3 transition hover:bg-[#007AFF]/5 md:w-[120px] md:flex-none"
          >
            <Image src="/images/svgexport-21.svg" alt="Instagram" width={24} height={24} className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="flex flex-1 items-center justify-center rounded-[12px] border border-[#007AFF] bg-white py-3 transition hover:bg-[#007AFF]/5 md:w-[120px] md:flex-none"
          >
            <Image src="/images/svgexport-22.svg" alt="Facebook" width={24} height={24} className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* ── 11. EXPLORE OS NOSSOS PLANOS ── */}
      <section id="explore-plans" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-[36px] font-bold text-[rgb(13,13,14)] md:text-[40px]">
            Conheça nossos planos
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-center text-[16px] leading-relaxed text-[rgb(120,130,145)]">
            Descubra nossas ofertas flexíveis e escolha a que melhor se adapta à sua jornada de aprendizado e desenvolvimento pessoal.
          </p>

          <div className="mx-auto mt-8 max-w-[350px]">
            <div className="overflow-hidden rounded-[16px] border border-[rgb(217,231,255)] bg-white">
              <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[rgb(120,130,145)]">
                  SUBSCRIÇÃO MENSAL
                </p>
                <hr className="my-4 border-[rgb(229,231,235)]" />
                <div className="flex items-baseline gap-1">
                  <span className="text-[36px] font-bold text-[rgb(13,118,110)] md:text-[40px]">
                    R$5,00
                  </span>
                  <span className="text-[14px] text-[rgb(120,130,145)]">/7 dias</span>
                </div>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[rgb(120,130,145)]">
                  Teste introdutório
                </p>
                <hr className="my-4 border-[rgb(229,231,235)]" />
                <p className="text-[14px] text-[rgb(13,13,14)]">
                  então <strong>R$176,99*</strong> /mês
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[rgb(120,130,145)]">
                  A assinatura é renovada automaticamente a cada mês após o período de teste de 7 dias. Cancele quando quiser.
                </p>
                <hr className="my-4 border-[rgb(229,231,235)]" />
                <ul className="space-y-3">
                  {[
                    "Máxima economia para o crescimento a longo prazo",
                    "Pacote completo de avaliação cognitiva",
                    "Mais de 20 horas de cursos com especialistas",
                    "Trilha de desenvolvimento personalizada",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[rgb(13,13,14)]"
                    >
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={openCheckout}
                  className="w-full rounded-[12px] bg-[rgb(13,118,110)] px-6 py-4 text-[16px] font-semibold text-white transition hover:bg-[rgb(10,100,93)]"
                  style={{ height: 52 }}
                >
                  Começar
                </button>
              </div>
            </div>
            <p className="mt-4 text-center text-[13px] text-[rgb(120,130,145)]">
              *Visite a nossa{" "}
              <a href="#" className="underline">
                página de preços
              </a>{" "}
              para mais detalhes.
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. PERGUNTAS FREQUENTES ── */}
      <section id="faq" className="relative z-0 w-full py-6 md:py-10">
        <div className="mx-auto flex max-w-[700px] flex-col justify-center px-4 md:px-0">
          <h2 className="mb-8 text-center text-[28px] font-bold text-[rgb(44,51,69)] md:mb-10 md:text-[36px]">
            Perguntas Frequentes
          </h2>

          <div className="flex w-full flex-col">
            {FAQS.map((item, index) => {
              const isOpen = openFaqs.includes(index);
              return (
                <div key={item.q} className="border-b border-solid border-[#e5e7eb]">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-[16px] font-medium text-[rgb(44,51,69)] pr-4">
                      {item.q}
                    </span>
                    <span
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(-90deg)" : "rotate(0deg)",
                      }}
                    >
                      <Image src="/images/svgexport-23.svg" alt="" width={24} height={24} className="h-full w-full" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-8 text-[15px] leading-relaxed text-[rgb(100,110,130)]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 13. FOOTER ── */}
      <Footer />
    </main>
  );
}

/* ─────────────── COMPONENTS ─────────────── */

function Navbar({ onLogin, onStart }: { onLogin: () => void; onStart: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 border-b border-[rgb(229,231,235)] shadow-sm"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          height: 60,
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/brand/myiq/logo-desktop.svg"
              alt="myIQ"
              width={108}
              height={31}
              className="h-[31px] w-auto"
            />
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="block p-2 text-black md:hidden"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={onLogin}
              className="rounded-[12px] border border-[rgb(13,118,110)] bg-transparent px-6 py-2 text-[14px] font-medium text-[rgb(13,118,110)] transition hover:bg-[rgb(13,118,110)]/5"
              style={{ height: 40 }}
            >
              Fazer Login
            </button>
            <button
              onClick={onStart}
              className="rounded-[12px] bg-[rgb(13,118,110)] px-6 py-2 text-[14px] font-semibold text-white transition hover:bg-[rgb(10,100,93)]"
              style={{ height: 40 }}
            >
              Iniciar Teste
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Drawer (Right Side) */}
          <div className="relative flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4" style={{ height: 60 }}>
              <Image
                src="/brand/myiq/logo-desktop.svg"
                alt="myIQ"
                width={108}
                height={31}
                className="h-[31px] w-auto"
              />
              <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-6 text-[16px] text-[#4b5563]">
                <a href="#how-it-works" onClick={() => setMenuOpen(false)}>Como Funciona</a>
                <a href="#available-tests" onClick={() => setMenuOpen(false)}>Testes Disponíveis</a>
                <a href="#explore-plans" onClick={() => setMenuOpen(false)}>Explore os nossos planos</a>
                <a href="#faq" onClick={() => setMenuOpen(false)}>Perguntas Frequentes</a>
                <a href="#" onClick={() => setMenuOpen(false)}>Ajuda e Suporte</a>
              </div>
              
              <hr className="border-gray-100" />
              
              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogin();
                  }}
                  className="flex h-[48px] w-full items-center justify-center rounded-[12px] border border-[#0D766E] text-[16px] font-medium text-[#0D766E] transition hover:bg-[#0D766E]/5"
                >
                  Fazer Login
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onStart();
                  }}
                  className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#0D766E] text-[16px] font-semibold text-white transition hover:bg-[#0A645D]"
                >
                  Iniciar Teste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LogoMarquee() {
  const logos = [...PRESS_LOGOS, ...PRESS_LOGOS];
  return (
    <div 
      className="marquee-mask mx-auto flex w-full max-w-[90dvw] overflow-x-hidden py-4"
      style={{ "--scroll-shadow-size": "min(20vw, 300px)", "--gap": "40px", "--duration": "40s" } as React.CSSProperties}
    >
      <div className="animate-scrolling-banner flex w-max items-stretch opacity-1 hover:[animation-play-state:paused]" style={{ gap: "40px" }}>
        {logos.map((logo, i) => (
          <Image
            key={`${logo.src}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-[28px] w-auto shrink-0 object-contain"
          />
        ))}
      </div>
    </div>
  );
}

function BellCurveSVG() {
  return (
    <Image src="/images/svgexport-4.svg" alt="Bell Curve" width={941} height={578} className="h-full w-full scale-[1.2] object-contain" />
  );
}

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative mt-8 flex items-center justify-center gap-4">
      <button
        onClick={() => scroll("left")}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgb(229,231,235)] bg-white text-[rgb(120,130,145)] transition hover:bg-gray-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div ref={scrollRef} className="flex w-full max-w-[360px] gap-4 overflow-x-auto hide-scrollbar">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="w-full shrink-0 bg-[#F9F9F9] p-6 text-left"
          >
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <div
                    key={si}
                    className={`flex h-[24px] w-[24px] items-center justify-center ${
                      si < r.stars ? "bg-[#00b67a]" : "bg-[#dcdce6]"
                    }`}
                  >
                    <span className="text-[16px] text-white">★</span>
                  </div>
                ))}
              </div>
              <div className="ml-2 flex items-center gap-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#696A6E]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[14px] font-medium text-[#696A6E] underline underline-offset-2">Por convite</span>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-[22px] text-[#191919]">{r.body}</p>
            <p className="mt-6 text-[14px] text-[#696A6E]">
              <strong className="font-bold text-[#696A6E]">{r.name},</strong> {r.time}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#191919] bg-white text-[#191919] transition hover:bg-gray-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[rgb(0,27,54)] px-4 py-8 text-[rgb(200,215,230)] md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-8 md:gap-16">
          {/* Col 1: Logo + Social */}
          <div className="min-w-[160px]">
            <Image
              src="/images/svgexport-25.svg"
              alt="myIQ"
              width={105}
              height={30}
              className="h-[28px] w-auto"
            />
            <div className="mt-4 flex gap-3">
              <SocialCircle>
                <Image src="/images/svgexport-26.svg" alt="Reddit" width={24} height={24} className="h-5 w-5" />
              </SocialCircle>
              <SocialCircle>
                <Image src="/images/svgexport-27.svg" alt="Instagram" width={24} height={24} className="h-5 w-5" />
              </SocialCircle>
              <SocialCircle>
                <Image src="/images/svgexport-28.svg" alt="Facebook" width={24} height={24} className="h-5 w-5" />
              </SocialCircle>
            </div>
          </div>

          {/* Col 2: Suporte ao cliente */}
          <div>
            <p className="text-[14px] font-semibold text-[rgb(140,165,195)]">Suporte ao cliente</p>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><a href="#" className="hover:text-white transition">Como cancelar</a></li>
              <li>
                <a
                  href="#"
                  className="mt-2 flex w-max items-center gap-3 rounded-full border border-white px-5 py-2.5 text-white transition hover:bg-white/10"
                >
                  <Image src="/images/svgexport-29.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] font-medium leading-tight">Suporte ao cliente</span>
                    <span className="text-[12px] leading-tight opacity-90">24/7/365</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Jurídico */}
          <div>
            <p className="text-[14px] font-semibold text-[rgb(140,165,195)]">Jurídico</p>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos e Condições</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition">Política de reembolso</a></li>
            </ul>
          </div>

          {/* Col 4: Sobre Nós */}
          <div>
            <p className="text-[14px] font-semibold text-[rgb(140,165,195)]">Sobre Nós</p>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><a href="#" className="hover:text-white transition">Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition">Preços</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-6 md:mt-16">
          <hr className="border-white/10" />
          
          {/* Language selector */}
          <button className="flex w-max items-center gap-2 rounded-[8px] border border-white/20 bg-transparent px-4 py-2 text-[14px] font-medium text-white transition hover:bg-white/5">
            Português (Brasil)
            <Image src="/images/svgexport-30.svg" alt="" width={20} height={20} className="h-4 w-4 opacity-80" />
          </button>
          
          <p className="text-[14px] leading-relaxed text-[rgb(200,215,230)]">
            Copyright © 2024-2026 myIQ™. Envest Research Inc. 2093 Philadelphia Pike #3129, Claymont, DE 19703, United States. Todos os direitos reservados. Todas as marcas registradas aqui mencionadas são propriedade de seus respectivos proprietários. O teste é apenas para fins de entretenimento ou educacionais e não substitui uma avaliação profissional.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-[32px] w-[50px] items-center justify-center rounded-[4px] bg-white p-1.5">
              <Image src="/images/svgexport-31.svg" alt="Visa" width={33} height={12} className="h-auto w-full object-contain" />
            </div>
            <div className="flex h-[32px] w-[50px] items-center justify-center rounded-[4px] bg-white p-1.5">
              <Image src="/images/svgexport-32.svg" alt="Mastercard" width={31} height={19} className="h-auto w-full object-contain" />
            </div>
            <div className="flex h-[32px] w-[50px] items-center justify-center rounded-[4px] bg-white p-1.5">
              <Image src="/images/svgexport-33.svg" alt="PayPal" width={123} height={30} className="h-auto w-full object-contain scale-[1.1]" />
            </div>
            <div className="flex h-[32px] w-[50px] items-center justify-center rounded-[4px] bg-white p-1.5">
              <Image src="/images/svgexport-34.svg" alt="Apple Pay" width={33} height={14} className="h-auto w-full object-contain" />
            </div>
            <div className="flex h-[32px] w-[50px] items-center justify-center rounded-[4px] bg-white p-1.5">
              <Image src="/images/svgexport-35.svg" alt="Google Pay" width={33} height={17} className="h-auto w-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialCircle({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full text-white">
      {children}
    </span>
  );
}

/* ─────────────── ICONS ─────────────── */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0">
      <circle cx="9" cy="9" r="9" fill="rgb(13,118,110)" fillOpacity="0.12" />
      <path
        d="M5 9L7.5 11.5L13 6"
        stroke="rgb(13,118,110)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlueCheckIcon() {
  return <Image src="/images/svgexport-20.svg" alt="" width={22} height={22} className="shrink-0" />;
}

function ChevronIcon() {
  // Using custom inline icon because faq chevron needs to rotate and current color
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5 3L9 7L5 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return <Image src="/images/svgexport-11.svg" alt="" width={30} height={38} className="h-auto w-10" />;
}

function NodesIcon() {
  return <Image src="/images/svgexport-12.svg" alt="" width={39} height={38} className="h-auto w-10" />;
}

function RocketIcon() {
  return <Image src="/images/svgexport-13.svg" alt="" width={39} height={38} className="h-auto w-10" />;
}

function BrainIcon() {
  return <Image src="/images/svgexport-14.svg" alt="" width={38} height={38} className="h-auto w-10" />;
}

function HeadThinkIcon() {
  return <Image src="/images/svgexport-17.svg" alt="" width={38} height={38} className="h-auto w-10" />;
}

function LightbulbIcon() {
  return <Image src="/images/svgexport-18.svg" alt="" width={28} height={38} className="h-auto w-10" />;
}

function ClockIcon() {
  return <Image src="/images/svgexport-15.svg" alt="" width={16} height={16} className="h-4 w-4" />;
}

function DocIcon() {
  return <Image src="/images/svgexport-16.svg" alt="" width={16} height={16} className="h-4 w-4" />;
}
