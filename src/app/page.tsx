"use client";
import { useState } from "react";
import { ScriptOptions } from "@/types/ScriptOptions";
import useKanaCycle from "@/hooks/useKanaCycle";
import useKanaList from "@/hooks/useKanaList";

export default function Home() {
  const [selection, setSelection] = useState<ScriptOptions>("Katakana");
  const kanaList = useKanaList(selection);
  const [speedMs, setSpeedMs] = useState<number>(3000);
  const { currentKana, showCharacter, elapsedMs } = useKanaCycle(
    kanaList,
    speedMs,
  );

  return (
    <>
      <h1 className="w-full text-center text-slate-50 text-4xl font-extrabold tracking-tight bg-[#72241a] p-4 shadow">
        Kurikaesu
      </h1>
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#f6ffec]">
        {/* Show character */}
        <div className="text-[clamp(10rem,50vw,25rem)] font-bold text-[#4ec49b]">
          {currentKana.char}
        </div>
        {showCharacter && (
          <progress
            className="h-6 appearance-none w-64"
            value={elapsedMs}
            max={speedMs}
          ></progress>
        )}
        {/* Show romaji */}
        {!showCharacter && (
          <div className="p-2">
            <div className="text-6xl font-bold text-black">
              {currentKana.romaji}
            </div>
            {currentKana.meaning && (
              <div className="text text-center text-gray-500">
                {currentKana.meaning}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-full bg-[#F79BBF] text-white p-2">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-start">
          <div className="w-full md:flex-1">
            <label className="font-bold block mb-1">Script:</label>
            <select
              value={selection}
              onChange={(event) =>
                setSelection(event.target.value as ScriptOptions)
              }
              className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 text-white"
            >
              <option>Katakana</option>
              <option>Hiragana</option>
              <option>214 Classic Radicals</option>
              <option>All</option>
            </select>
          </div>
          <div className="w-full md:flex-1">
            <label className="font-bold block mb-1">Speed:</label>
            <select
              value={speedMs}
              onChange={(event) => setSpeedMs(Number(event.target.value))}
              className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 text-white"
            >
              <option value={4000}>Slow</option>
              <option value={3000}>Medium</option>
              <option value={2000}>Fast</option>
              <option value={1000}>神モード</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
