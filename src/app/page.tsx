"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [fade, setFade] = useState(false);

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade(true);
    }, 100);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">Kurikaesu</h1>

      {!showDiv && (
        <div
          className={`transition-colors duration-[3000ms]
          text-[40vh] font-bold
           ${fade ? "text-white" : "text-black"}`}
        >
          カ
        </div>
      )}
      {showDiv && (
        <div className={`text-[40vh] font-bold`} style={{ color: "#9ACD32" }}>
          ka
        </div>
      )}
      <div className="w-full max-w-sm">
        <select className="block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Katakana</option>
          <option>Hiragana</option>
          <option>All</option>
        </select>
      </div>
    </>
  );
}
