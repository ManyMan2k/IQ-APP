"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BRAIN = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C9.5 3 7.5 4.5 7 6.5C5.2 6.8 4 8.3 4 10C4 11.1 4.5 12.1 5.3 12.7C4.5 13.4 4 14.4 4 15.5C4 17.4 5.3 19 7 19.5V21H17V19.5C18.7 19 20 17.4 20 15.5C20 14.4 19.5 13.4 18.7 12.7C19.5 12.1 20 11.1 20 10C20 8.3 18.8 6.8 17 6.5C16.5 4.5 14.5 3 12 3Z"
      stroke="#374151"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <line x1="12" y1="5" x2="12" y2="19" stroke="#D1D5DB" strokeWidth="1.2" />
  </svg>
);

function ResultsContent() {
  const params = useSearchParams();
  const time = Number(params.get("time") ?? 0);
  const safeTime = Number.isFinite(time) && time > 0 ? time : 0;
  const iq = 112 + (safeTime % 13);

  const mins = Math.floor(safeTime / 60);
  const secs = safeTime % 60;
  const timeStr = `${mins}m ${secs}s`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full flex items-center px-6 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          {BRAIN}
          <span className="text-[17px] font-bold text-gray-900">
            my<span className="font-extrabold">IQ</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-6 w-full max-w-[520px]">
        <h1 className="text-[24px] font-bold text-gray-900 text-center">
          Calculando seu{" "}
          <span style={{ color: "#0D9488" }}>QI Real...</span>
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 w-full flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: "#F0FDFA", border: "4px solid #0D9488" }}
          >
            <span className="text-[40px] font-bold" style={{ color: "#0D9488" }}>
              {iq}
            </span>
          </div>

          <p className="text-[15px] text-gray-600 text-center">
            Teste concluído em <strong>{timeStr}</strong>
          </p>

          <p className="text-[13px] text-gray-400 text-center">
            Para ver seu relatório completo e certificado, ative sua assinatura myIQ.
          </p>

          <button
            style={{ background: "#0F766E" }}
            className="w-full py-4 rounded-2xl font-semibold text-[15px] text-white hover:opacity-90 mt-2"
          >
            Ver Resultado Completo — US$ 1,00
          </button>
        </div>

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          Teste de 7 dias por US$ 1,00, depois US$ 29,99/mês. Cancele a qualquer momento.
        </p>
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ResultsContent />
    </Suspense>
  );
}
