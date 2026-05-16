"use client";
import { useState } from "react";
import { ScriptOptions } from "@/types/ScriptOptions";
import useKanaCycle from "@/hooks/useKanaCycle";
import useKanaList from "@/hooks/useKanaList";

export default function Home() {
  const [selection, setSelection] = useState<ScriptOptions>("Katakana");
  const kanaList = useKanaList(selection);
  const { currentKana, showCharacter } = useKanaCycle(kanaList);

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

        {/* Show romaji */}
        {!showCharacter && (
          <div className="p-2">
            <div className="text-8xl font-bold text-black">
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

      <div className="w-full bg-[#F79BBF] text-white text-center p-4">
        <label className="font-bold">Script:</label>
        <select
          value={selection}
          onChange={(event) =>
            setSelection(event.target.value as ScriptOptions)
          }
          className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
        >
          <option>Katakana</option>
          <option>Hiragana</option>
          <option>214 Classic Radicals</option>
          <option>All</option>
        </select>
      </div>
    </>
  );
}
