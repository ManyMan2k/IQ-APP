"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type MCQ    = { type: "mcq";    q: string; opts: string[] };
type Likert = { type: "likert"; q: string };
type Memory = {
  type: "memory";
  sequence: string;
  displaySeconds: number;
  recall: { q: string; opts: string[] };
};
type Question = MCQ | Likert | Memory;

// ─── Likert options (always the same 5) ───────────────────────────────────────
const LIKERT: Array<{ label: string; bg: string; selected: string }> = [
  { label: "Concordo Fortemente",  bg: "#DCFCE7", selected: "#BBF7D0" },
  { label: "Concordo",             bg: "#F0FDF4", selected: "#D1FAE5" },
  { label: "Neutro",               bg: "#FFFBEB", selected: "#FEF08A" },
  { label: "Discordo",             bg: "#FFF1F2", selected: "#FECDD3" },
  { label: "Discordo Fortemente",  bg: "#FFE4E6", selected: "#FDA4AF" },
];

// ─── Questions (39 total) ─────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  // 1
  { type: "mcq", q: "Um agricultor tem 15 ovelhas. Todas menos 8 morrem. Quantas ficam?",
    opts: ["7", "8", "15", "0", "3"] },
  // 2
  { type: "mcq", q: "Você ultrapassa a pessoa que está em 3º lugar. Em que posição você está?",
    opts: ["1", "4", "3", "2", "5"] },
  // 3
  { type: "mcq", q: "Quantos cantos tem um cubo?",
    opts: ["6", "4", "8", "5", "7"] },
  // 4
  { type: "likert", q: "Prefiro aprender através de experiência prática" },
  // 5
  { type: "mcq", q: "Qual é o próximo número nesta sequência? 2, 4, 8, 16, ___",
    opts: ["20", "24", "30", "32", "36"] },
  // 6
  { type: "mcq", q: "Que número falta? 3, 6, 9, 12, ___, 18",
    opts: ["13", "14", "15", "16", "17"] },
  // 7
  { type: "memory", sequence: "7 3 8 5", displaySeconds: 4,
    recall: { q: "Qual foi o 2º dígito?", opts: ["7", "3", "8", "1", "5"] } },
  // 8
  { type: "memory", sequence: "4 9 2 6 1", displaySeconds: 5,
    recall: { q: "Qual foi o 3º dígito?", opts: ["9", "2", "6", "3", "4"] } },
  // 9
  { type: "memory", sequence: "3 8 5 1 7 4", displaySeconds: 4,
    recall: { q: "Qual foi o 4º dígito?", opts: ["5", "1", "7", "9", "3"] } },
  // 10 — placeholder (substituir quando o usuário enviar)
  { type: "mcq", q: "Complete a sequência: 1, 4, 9, 16, 25, ___",
    opts: ["30", "32", "36", "40", "49"] },
  // 11
  { type: "likert", q: "Consigo me concentrar por longos períodos sem me distrair" },
  // 12
  { type: "mcq", q: "Médico está para Hospital assim como Professor está para ___",
    opts: ["Aluno", "Escola", "Livro", "Aula", "Caderno"] },
  // 13
  { type: "mcq", q: "Quantos meses do calendário têm 28 dias?",
    opts: ["1", "2", "4", "6", "12"] },
  // 14
  { type: "memory", sequence: "2 7 4 9", displaySeconds: 4,
    recall: { q: "Qual foi o 1º dígito?", opts: ["4", "2", "7", "9", "1"] } },
  // 15
  { type: "mcq", q: "Fogo está para Quente assim como Gelo está para ___",
    opts: ["Água", "Neve", "Frio", "Branco", "Inverno"] },
  // 16
  { type: "mcq", q: "Quanto é 25% de 200?",
    opts: ["25", "40", "50", "75", "100"] },
  // 17
  { type: "likert", q: "Tenho facilidade em perceber padrões e regularidades" },
  // 18
  { type: "mcq", q: "3 gatos caçam 3 ratos em 3 minutos. Quantos gatos para caçar 100 ratos em 100 minutos?",
    opts: ["1", "3", "10", "33", "100"] },
  // 19
  { type: "mcq", q: "Complete a sequência: A, C, E, G, ___",
    opts: ["H", "I", "J", "K", "L"] },
  // 20
  { type: "mcq", q: "Qual é a raiz quadrada de 144?",
    opts: ["10", "11", "12", "13", "14"] },
  // 21
  { type: "likert", q: "Prefiro resolver problemas de forma lógica e sistemática" },
  // 22
  { type: "memory", sequence: "5 1 6 3 8 2", displaySeconds: 5,
    recall: { q: "Qual foi o 5º dígito?", opts: ["3", "5", "8", "1", "6"] } },
  // 23
  { type: "mcq", q: "Pedro tem 2 filhos. Cada filho tem uma irmã. Quantas crianças Pedro tem?",
    opts: ["2", "3", "4", "5", "6"] },
  // 24
  { type: "mcq", q: "Sequência de Fibonacci: 1, 1, 2, 3, 5, 8, ___",
    opts: ["10", "11", "12", "13", "16"] },
  // 25
  { type: "likert", q: "Gosto de explorar novas ideias e conceitos" },
  // 26
  { type: "mcq", q: "Se você dividir 30 por ½ e adicionar 10, qual é o resultado?",
    opts: ["25", "40", "55", "70", "80"] },
  // 27
  { type: "memory", sequence: "8 3 6 1 4", displaySeconds: 4,
    recall: { q: "Qual foi o 3º dígito?", opts: ["1", "8", "6", "3", "4"] } },
  // 28
  { type: "mcq", q: "Complete: 5, 10, 20, 40, ___",
    opts: ["60", "70", "75", "80", "100"] },
  // 29
  { type: "likert", q: "Tenho boa memória para números e sequências" },
  // 30
  { type: "mcq", q: "Qual é o próximo: 1, 8, 27, 64, ___?",
    opts: ["100", "121", "125", "144", "216"] },
  // 31
  { type: "mcq", q: "Ana tem o dobro da idade de Bruno. Daqui a 5 anos, a soma das idades será 40. Qual a idade atual de Ana?",
    opts: ["10", "15", "18", "20", "25"] },
  // 32
  { type: "likert", q: "Costumo analisar situações antes de tomar uma decisão" },
  // 33
  { type: "mcq", q: "Qual palavra é ANTÔNIMO de ABUNDANTE?",
    opts: ["Cheio", "Rico", "Escasso", "Farto", "Grande"] },
  // 34
  { type: "memory", sequence: "1 5 9 2 7 6", displaySeconds: 5,
    recall: { q: "Qual foi o 2º dígito?", opts: ["9", "1", "5", "2", "7"] } },
  // 35
  { type: "mcq", q: "Se A > B e B > C, então qual afirmação é verdadeira?",
    opts: ["A = C", "C > A", "A > C", "B = C", "Impossível determinar"] },
  // 36
  { type: "mcq", q: "Quanto é 2 elevado à 4ª potência?",
    opts: ["6", "8", "12", "16", "24"] },
  // 37
  { type: "likert", q: "Tenho facilidade de encontrar soluções criativas para problemas" },
  // 38
  { type: "mcq", q: "Uma loja reduz um produto em 20% e depois aumenta 20%. A variação total foi:",
    opts: ["-4%", "0%", "+4%", "+20%", "-20%"] },
  // 39
  { type: "mcq", q: "Silêncio está para Barulho assim como Paz está para ___",
    opts: ["Harmonia", "Conflito", "Tranquilidade", "Calma", "Alegria"] },
];

const TOTAL = QUESTIONS.length; // 39

// ─── SVGs ─────────────────────────────────────────────────────────────────────
const BRAIN = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C9.5 3 7.5 4.5 7 6.5C5.2 6.8 4 8.3 4 10C4 11.1 4.5 12.1 5.3 12.7C4.5 13.4 4 14.4 4 15.5C4 17.4 5.3 19 7 19.5V21H17V19.5C18.7 19 20 17.4 20 15.5C20 14.4 19.5 13.4 18.7 12.7C19.5 12.1 20 11.1 20 10C20 8.3 18.8 6.8 17 6.5C16.5 4.5 14.5 3 12 3Z"
      stroke="#374151" strokeWidth="1.5" fill="none" strokeLinejoin="round"
    />
    <line x1="12" y1="5" x2="12" y2="19" stroke="#D1D5DB" strokeWidth="1.2" />
    <path d="M7.5 10.5C8.5 11.5 10 12 11.5 11.5" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" fill="none" />
    <path d="M16.5 10.5C15.5 11.5 14 12 12.5 11.5" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

const CLOCK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#374151" strokeWidth="1.2" />
    <path d="M8 5V8.5L10.5 10" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

function fmtTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();

  const [currentQ, setCurrentQ]         = useState(0);
  const [elapsed, setElapsed]           = useState(0);
  const [selected, setSelected]         = useState<number | null>(null);

  // Global timer
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const advance = useCallback(() => {
    if (currentQ < TOTAL - 1) {
      setCurrentQ(q => q + 1);
    } else {
      router.push(`/pt/results?time=${elapsed}`);
    }
  }, [currentQ, elapsed, router]);

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      setSelected(null);
      advance();
    }, 300);
  }, [selected, advance]);

  const q        = QUESTIONS[currentQ];
  const progress = Math.round((currentQ / TOTAL) * 100);
  const counter  = currentQ + 1;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          {BRAIN}
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">
            my<span className="font-extrabold">IQ</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[14px] font-medium text-gray-700">
          {CLOCK}
          <span>{fmtTime(elapsed)}</span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-[3px] bg-gray-100 w-full">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "#0D9488" }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[640px] flex flex-col gap-5">

          {/* MCQ */}
          {q.type === "mcq" && (
            <MCQView q={q.q} opts={q.opts} selected={selected} onAnswer={handleAnswer} />
          )}

          {/* Likert */}
          {q.type === "likert" && (
            <LikertView q={q.q} selected={selected} onAnswer={handleAnswer} />
          )}

          {q.type === "memory" && (
            <MemoryQuestion
              key={currentQ}
              question={q}
              selected={selected}
              onAnswer={handleAnswer}
            />
          )}

          {/* Counter */}
          <p className="text-center text-[13px] text-gray-400 mt-2">
            {counter} de {TOTAL}
          </p>
        </div>
      </main>
    </div>
  );
}

function MemoryQuestion({
  question,
  selected,
  onAnswer,
}: {
  question: Memory;
  selected: number | null;
  onAnswer: (i: number) => void;
}) {
  const [countdown, setCountdown] = useState(question.displaySeconds);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          clearInterval(id);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  if (countdown > 0) {
    return <MemoryDisplay sequence={question.sequence} countdown={countdown} />;
  }

  return (
    <MCQView
      q={question.recall.q}
      opts={question.recall.opts}
      selected={selected}
      onAnswer={onAnswer}
    />
  );
}

// ─── MCQ ──────────────────────────────────────────────────────────────────────
function MCQView({
  q, opts, selected, onAnswer,
}: {
  q: string; opts: string[]; selected: number | null; onAnswer: (i: number) => void;
}) {
  return (
    <>
      <p className="text-[17px] font-semibold text-gray-800 text-center leading-snug">{q}</p>
      <div className="flex flex-col gap-3">
        {opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            style={{ background: selected === i ? "#C7EDE8" : "#EDF7F4" }}
            className="w-full py-4 px-5 rounded-2xl text-[15px] font-medium text-gray-700 text-left transition-colors hover:opacity-90 active:scale-[0.99]"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Likert ───────────────────────────────────────────────────────────────────
function LikertView({
  q, selected, onAnswer,
}: {
  q: string; selected: number | null; onAnswer: (i: number) => void;
}) {
  return (
    <>
      <p className="text-[17px] font-semibold text-gray-800 text-center leading-snug">{q}</p>
      <div className="flex flex-col gap-3">
        {LIKERT.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            style={{ background: selected === i ? opt.selected : opt.bg }}
            className="w-full py-4 px-5 rounded-2xl text-[15px] font-medium text-gray-700 text-left transition-colors hover:opacity-90 active:scale-[0.99]"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Memory display ───────────────────────────────────────────────────────────
function MemoryDisplay({ sequence, countdown }: { sequence: string; countdown: number }) {
  return (
    <>
      <p className="text-[17px] font-semibold text-gray-800 text-center">
        Memorize esta sequência numérica
      </p>
      <div className="border border-gray-200 rounded-2xl flex items-center justify-center py-10 px-8 shadow-sm">
        <span className="text-[44px] font-bold text-gray-800 tracking-widest">{sequence}</span>
      </div>
      <p className="text-[14px] text-gray-400 text-center">
        Desaparece em <strong>{countdown}</strong> segundo{countdown !== 1 ? "s" : ""}
      </p>
    </>
  );
}
