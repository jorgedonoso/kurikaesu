"use client";
import { useState } from "react";
import { Select } from "@/components/Select";
import { Script } from "@/types/Script";
import useKanaCycle from "@/hooks/useKanaCycle";
import useKanaList from "@/hooks/useKanaList";
import { speedOptions } from "@/data/speedOptions";
import { scriptOptions } from "@/data/scriptOptions";

export default function Home() {
  const [selection, setSelection] = useState<Script>("Katakana");
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
      <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#ffffd3]">
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
          <Select
            label="Script"
            value={selection}
            onChange={setSelection}
            options={scriptOptions}
          />
          <Select
            label="Speed"
            value={speedMs}
            onChange={setSpeedMs}
            options={speedOptions}
          />
        </div>
      </div>
    </>
  );
}
