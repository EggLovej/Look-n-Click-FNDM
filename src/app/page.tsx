"use client";

import { useState } from "react";
import NumberPage from "./components/NumberPage";
import StocksPage from "./components/StocksPage";

export default function Home() {
  const [activePage, setActivePage] = useState<"number" | "stocks">("number");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8 gap-8">
      <header className="flex gap-4">
        <button
          onClick={() => setActivePage("number")}
          className={`px-4 py-2 rounded-full ${
            activePage === "number" ? "bg-white text-black" : "bg-neutral-800"
          }`}
        >
          Number
        </button>
        <button
          onClick={() => setActivePage("stocks")}
          className={`px-4 py-2 rounded-full ${
            activePage === "stocks" ? "bg-white text-black" : "bg-neutral-800"
          }`}
        >
          Stocks
        </button>
      </header>
      <main className="w-full max-w-6xl">
        {activePage === "number" ? <NumberPage /> : <StocksPage />}
      </main>
    </div>
  );
}
