"use client";

import { Suspense, useEffect, useState } from "react";

const BRAIN_WHITE = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C9.5 3 7.5 4.5 7 6.5C5.2 6.8 4 8.3 4 10C4 11.1 4.5 12.1 5.3 12.7C4.5 13.4 4 14.4 4 15.5C4 17.4 5.3 19 7 19.5V21H17V19.5C18.7 19 20 17.4 20 15.5C20 14.4 19.5 13.4 18.7 12.7C19.5 12.1 20 11.1 20 10C20 8.3 18.8 6.8 17 6.5C16.5 4.5 14.5 3 12 3Z"
      stroke="#fff"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <line x1="12" y1="5" x2="12" y2="19" stroke="#ffffff80" strokeWidth="1.2" />
  </svg>
);

const CHECK = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="10" r="10" fill="#D1FAE5" />
    <path d="M6 10.5L8.5 13L14 7" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STAR = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#00B67A">
    <path d="M7 0l1.8 4.2 4.6.4-3.5 3 1.1 4.5L7 11.7 2.9 12.1 4 7.6.5 4.6l4.6-.4z" />
  </svg>
);

const NOTIFS = [
  { name: "ALBORNOZ", country: "🇦🇷", iq: 133 },
  { name: "MARIANA", country: "🇧🇷", iq: 128 },
  { name: "GONÇALVES", country: "🇵🇹", iq: 141 },
  { name: "RODRIGUES", country: "🇧🇷", iq: 119 },
];

function useCountdown(start: number) {
  const [left, setLeft] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return { m, s };
}

function CheckoutContent() {
  const { m, s } = useCountdown(9 * 60 + 22);
  const [notif, setNotif] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNotif((n) => (n + 1) % NOTIFS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const cur = NOTIFS[notif];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-gray-900">
      <div className="w-full max-w-[460px]">
        {/* Social proof bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 text-[12px]">
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="font-semibold text-gray-800">{cur.name}</span>
            <span className="hidden xs:inline">Acabou de obter o seu resultado de QI</span>
            <span>{cur.country}</span>
            <span className="bg-teal-50 text-teal-700 font-semibold px-1.5 py-0.5 rounded">QI {cur.iq}</span>
          </div>
        </div>

        {/* Offer header */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <p className="text-[13px] text-gray-700">
            Descubra o seu QI por apenas <strong>R$6,99!</strong> A oferta termina em
          </p>
          <span className="text-[14px] font-bold text-gray-900 tabular-nums">
            {m}:{s}
          </span>
        </div>

        {/* IQ cards */}
        <div className="px-4 pt-2 grid grid-cols-3 gap-3 items-end">
          {[
            { iq: 113, label: "Marie Curie", h: "h-24", bg: "bg-gray-100", txt: "text-gray-400" },
            { iq: "???", label: "Você", h: "h-32", bg: "bg-teal-600", txt: "text-white", me: true },
            { iq: 160, label: "Einstein", h: "h-24", bg: "bg-gray-100", txt: "text-gray-400" },
          ].map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={`text-[12px] font-semibold ${c.me ? "text-teal-600" : "text-gray-400"}`}>
                QI {c.iq}
              </span>
              <div className={`w-full ${c.h} ${c.bg} rounded-xl flex items-end justify-center pb-2`}>
                <span className={`text-[11px] font-medium ${c.txt}`}>{c.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pt-5 text-center">
          <h1 className="text-[22px] font-bold text-teal-600 leading-tight">Parabéns!</h1>
          <p className="text-[20px] font-bold text-teal-600 leading-tight">Sua pontuação está pronta!</p>
        </div>

        <div className="px-4 pt-4">
          <button className="w-full py-3.5 rounded-xl bg-teal-700 text-white font-semibold text-[15px] hover:opacity-90">
            Obter pontuação de QI
          </button>
        </div>

        {/* Press logos */}
        <div className="px-4 py-5 flex items-center justify-center gap-5 text-gray-400 text-[12px] font-semibold grayscale opacity-70">
          <span>BUSINESS INSIDER</span>
          <span>digitaltrends</span>
        </div>

        {/* Certificate */}
        <div className="px-4">
          <h2 className="text-[18px] font-bold text-center text-gray-900 mb-4">
            Obtenha já o seu certificado de QI!
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Obtenha o seu resultado de QI com precisão clínica numa avaliação validada cientificamente.",
              "Saiba onde está em comparação com a população geral",
              "Identifique suas forças e fraquezas cognitivas",
              "Obtenha um teste de 7 dias por apenas R$6,99. Após o teste, cobraremos R$119,99 todos os meses até você cancelar.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] text-gray-600 leading-snug">
                {CHECK}
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Promo / payment box */}
        <div className="px-4 pt-5">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div>
                <p className="text-[13px] font-semibold text-gray-800">Código Promocional MYIQ-87</p>
                <p className="text-[12px] text-gray-500">Aplicado</p>
              </div>
              <span className="bg-teal-600 text-white text-[12px] font-bold px-2 py-1 rounded">-87%</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
              <span className="text-[13px] font-semibold text-gray-700">Vence hoje:</span>
              <span className="text-[14px]">
                <s className="text-gray-400 mr-2">R$53,99</s>
                <strong className="text-gray-900">R$6,99</strong>
              </span>
            </div>
            <div className="p-3 flex flex-col gap-2.5">
              <button className="w-full py-3 rounded-lg bg-[#32BCAD] text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90">
                pix
              </button>
              <button className="w-full py-3 rounded-lg bg-black text-white font-semibold text-[15px] hover:opacity-90">
                G Pay
              </button>
              <button className="w-full py-3 rounded-lg bg-teal-700 text-white font-semibold text-[14px] hover:opacity-90">
                Cartão de crédito ou débito
              </button>
            </div>
          </div>
        </div>

        {/* Tests today */}
        <div className="px-4 py-5 text-center">
          <p className="text-[13px] text-gray-600">
            Mais de <strong className="text-gray-900">30.061</strong> testes realizados hoje
          </p>
          <p className="text-[12px] text-gray-400 mt-1">Média. QI: 116</p>
        </div>

        {/* Why trust */}
        <div className="px-4 py-4 bg-gray-50">
          <h3 className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-4 text-center">
            Por que pode confiar no myIQ
          </h3>
          <div className="flex flex-col gap-4">
            {[
              ["Teste de QI", "Nosso teste é baseado na metodologia de raciocínio matricial – o formato de padrão visual estudado em pesquisa cognitiva desde 1936."],
              ["Relatório completo", "O seu relatório personalizado é gerado utilizando a teoria amplamente aceite das capacidades cognitivas Cattell-Horn-Carroll (CHC)."],
              ["O Seu Kit de Crescimento", "O seu relatório é apenas o começo – aceda a jogos de treino cerebral, cursos de especialistas e mais de 15 avaliações adicionais."],
            ].map(([t, d], i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-[14px] font-semibold text-gray-800 mb-1">{t}</p>
                <p className="text-[12px] text-gray-500 leading-snug">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured logos */}
        <div className="px-4 py-5">
          <h3 className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-3 text-center">
            myIQ foi destaque em
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-gray-400 text-[12px] font-semibold grayscale opacity-70">
            <span>BUSINESS INSIDER</span>
            <span>digitaltrends</span>
            <span>msn</span>
            <span>newsweek</span>
            <span>USA TODAY</span>
            <span>yahoo!finance</span>
          </div>
        </div>

        {/* Personal report (blurred) */}
        <div className="px-4 py-4">
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">Relatório pessoal de QI</h3>
          <div className="relative rounded-xl border border-gray-200 p-4 overflow-hidden">
            <p className="text-[13px] text-gray-500 leading-relaxed blur-[3px] select-none">
              Seus resultados revelam um tipo cognitivo distinto — um retrato de como sua mente
              raciocina, processa e resolve problemas. Com base nos padrões de suas respostas, o
              que está lá dentro mostrará o que torna seu modo de pensar diferente do de todos os
              outros.
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-white/40">
              <span className="text-[12px] font-semibold text-teal-700 text-center px-4">
                Para ler o relatório completo, precisa de acesso total
              </span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <Benefits
          title="Como se beneficiará"
          items={[
            "Supere seus colegas e destaque-se em ambientes competitivos",
            "Abra novas oportunidades de carreira e atinja metas profissionais",
            "Tome melhores decisões em todos os aspectos da sua vida",
            "Aumente sua confiança e segurança para enfrentar novos desafios",
          ]}
        />
        <Benefits
          title="Aprenda como"
          items={[
            "Resolva problemas complexos com mais clareza e confiança",
            "Aprenda novas habilidades mais rápido e retenha informações com mais eficácia",
            "Desenvolva estratégias superiores de pensamento analítico",
            "Aprimore a memória para um desempenho melhor",
          ]}
        />

        {/* Reviews */}
        <div className="px-4 py-5">
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">Avaliações</h3>
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-1 mb-2">
              {STAR}{STAR}{STAR}{STAR}{STAR}
              <span className="text-[11px] text-gray-400 ml-1">Por convite</span>
            </div>
            <p className="text-[13px] font-semibold text-gray-800">Legal</p>
            <p className="text-[12px] text-gray-500 mt-1">Bem fácil e rápido</p>
            <p className="text-[11px] text-gray-400 mt-2">annaasouza@hotmail.com, há 53 minutos</p>
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
              <span className="font-semibold text-[#00B67A]">★ Trustpilot</span>
              <span>Classificado 4,1 / 5 baseado em 129.415 opiniões</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="px-4 py-4">
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">Perguntas Frequentes</h3>
          <div className="flex flex-col gap-2">
            {[
              ["O que está incluído na minha assinatura?", "A sua assinatura inclui o seu certificado de QI personalizado, relatório completo, acesso à nossa biblioteca completa de testes (personalidade, carreira, relacionamentos e muito mais), cursos educacionais e ferramentas de autoaperfeiçoamento, tudo concebido para o ajudar a descobrir-se."],
              ["Posso aceder ao programa em vários dispositivos?", "Sim, a sua assinatura do myIQ permite-lhe aceder ao programa em vários dispositivos, incluindo smartphones, tablets e computadores. Seu progresso será sincronizado em todos os seus dispositivos."],
              ["E se eu tiver perguntas adicionais ou precisar de suporte?", "Nossa equipe de suporte ao cliente dedicada está aqui para ajudar! Se você tiver alguma dúvida adicional, não hesite em entrar em contato conosco no centro de ajuda."],
            ].map(([q, a], i) => (
              <Faq key={i} q={q} a={a} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-6 px-5 py-8">
          <div className="flex items-center gap-2 mb-5">
            {BRAIN_WHITE}
            <span className="text-[16px] font-bold text-white">
              my<span className="font-extrabold">IQ</span>
            </span>
          </div>

          <div className="flex flex-col gap-5 text-[13px]">
            <div>
              <p className="text-white font-semibold mb-1">Apoio ao cliente</p>
              <p className="text-gray-400">Como cancelar</p>
              <p className="text-gray-500 text-[12px]">24/7/365</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Jurídico</p>
              <p className="text-gray-400">Política de Privacidade</p>
              <p className="text-gray-400">Termos e Condições</p>
              <p className="text-gray-400">Política de Cookies</p>
              <p className="text-gray-400">Política de reembolso</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Sobre Nós</p>
              <p className="text-gray-400">Ajuda</p>
              <p className="text-gray-400">Preços</p>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 leading-relaxed mt-6">
            Copyright © 2024-2026 myIQ™. Envest Research Inc. 2093 Philadelphia Pike #3129,
            Claymont, DE 19703, United States. Todos os direitos reservados. O teste destina-se
            apenas a fins de entretenimento ou educativos e não substitui uma avaliação profissional.
          </p>
          <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-500 font-semibold">
            <span>VISA</span>
            <span>mastercard</span>
            <span>Pay</span>
            <span>pix</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Benefits({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-[16px] font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] text-gray-600 leading-snug">
            {CHECK}
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-[13px] font-semibold text-gray-800">{q}</span>
        <span className="text-gray-400 text-[18px] shrink-0 ml-2">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="px-4 pb-3 text-[12px] text-gray-500 leading-snug">{a}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CheckoutContent />
    </Suspense>
  );
}
