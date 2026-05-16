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
      <h1 className="text-4xl font-bold">Kurikaesu</h1>

      {/* Show character */}
      {showCharacter && (
        <div className="text-[10vw] font-bold text-black">
          {currentKana.char}
        </div>
      )}

      {/* Show romaji */}
      {!showCharacter && (
        <div className="text-[10vw] font-bold text-[#9ACD32] leading-none break-words">
          {currentKana.romaji}
          {currentKana.meaning && (
            <div className="text-sm text-gray-500 mt-2">
              {currentKana.meaning}
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-sm mt-4">
        Script:
        <select
          value={selection}
          onChange={(event) =>
            setSelection(event.target.value as ScriptOptions)
          }
          className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
