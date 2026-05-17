import { Moji } from "@/types/Moji";
import { useState, useEffect } from "react";

// This hook manages the cycle of showing the character OR the romaji.
export default function useKanaCycle(kanaList: Moji[], speedMs: number) {
  const [showCharacter, setShowCharacter] = useState(true);
  const [currentKana, setCurrentKana] = useState<Moji>({
    char: "",
    romaji: "",
  });
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (kanaList.length === 0) return;

    let active = true;
    let startTime = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const startCycle = () => {
      if (!active) return;

      const randomIndex = Math.floor(Math.random() * kanaList.length);
      const nextKana = kanaList[randomIndex];
      setCurrentKana(nextKana);
      setShowCharacter(true);

      startTime = Date.now();
      setElapsedMs(0);

      // Update elapsedMs every 50ms. 50ms is ok.
      intervalId = setInterval(() => {
        if (!active) return;
        setElapsedMs(Date.now() - startTime);
      }, 50);

      timeoutId = setTimeout(() => {
        if (!active) return;
        setShowCharacter(false);

        timeoutId = setTimeout(() => {
          if (!active) return;
          clearInterval(intervalId);
          startCycle();
        }, speedMs);
      }, speedMs);
    };

    startCycle();

    return () => {
      active = false;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [kanaList, speedMs]);

  return { currentKana, showCharacter, elapsedMs };
}
