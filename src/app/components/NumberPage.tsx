"use client";

import { useEffect, useState } from "react";

export default function NumberPage() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/number")
      .then((res) => res.json())
      .then((data) => setPrice(data.number));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Random Number</h2>
      <div className="text-4xl">{price !== null ? price : "Loading..."}</div>
    </div>
  );
}