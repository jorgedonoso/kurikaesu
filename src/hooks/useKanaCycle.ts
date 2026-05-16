import { Moji } from "@/types/Moji";
import { useState, useEffect } from "react";

// This hook manages the cycle of showing the character OR the romaji.
export default function useKanaCycle(kanaList: Moji[]) {
  const [showCharacter, setShowCharacter] = useState(true);
  const [currentKana, setCurrentKana] = useState<Moji>({
    char: "",
    romaji: "",
  });

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startCycle = () => {
      if (!active || kanaList.length === 0) return;

      const randomIndex = Math.floor(Math.random() * kanaList.length);
      const nextKana = kanaList[randomIndex];

      setCurrentKana(nextKana);
      setShowCharacter(true);

      timeoutId = setTimeout(() => {
        if (!active) return;
        setShowCharacter(false);

        timeoutId = setTimeout(() => {
          if (!active) return;
          startCycle();
        }, 3000);
      }, 3000); // TODO: Let user set speed.
    };

    startCycle();

    return () => {
      active = true;
      clearTimeout(timeoutId);
    };
  }, [kanaList]);

  return { currentKana, showCharacter };
}
