import { Moji } from "@/types/Moji";
import { useState, useEffect } from "react";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { ScriptOptions } from "@/types/ScriptOptions";

// This hook returns dictionary based on dropdown selection.
export default function useKanaList(selection: ScriptOptions): Moji[] {
  const [kanaList, setKanaList] = useState<Moji[]>([]);

  useEffect(() => {
    let active = true;

    const loadData = () => {
      try {
        if (!active) return;

        let nextList: Moji[] = [];
        if (selection === "Katakana") {
          nextList = katakana;
        } else if (selection === "Hiragana") {
          nextList = hiragana;
        } else {
          nextList = [...hiragana, ...katakana];
        }

        setKanaList(nextList);
      } catch (error) {
        console.error("Failed to load lookup file", error);
        setKanaList([]);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [selection]);

  return kanaList;
}
