import { Moji } from "@/types/Moji";
import { useState, useEffect } from "react";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { radicals } from "../data/radicals";
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
        } else if (selection === "214 Classic Radicals") {
          nextList = radicals;
        } else {
          nextList = [...hiragana, ...katakana, ...radicals];
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
