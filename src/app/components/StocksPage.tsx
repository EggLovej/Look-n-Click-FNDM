"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StocksPage() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [stockData, setStockData] = useState<{ date: string; close: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching stock data for:", selectedStock);

    fetch(`http://localhost:8080/stocks/${selectedStock}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Raw stock data response:", data);

        if (Array.isArray(data)) {
          setStockData(data);
          setError(null);
        } else {
          console.error("Invalid stock data received:", data);
          setStockData([]);
          setError("Failed to load stock data");
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        if (
          err.message.includes("rate") ||
          err.message.includes("Server responded with 500")
        ) {
          setError("Rate limit exceeded");
        } else {
          setError("Failed to load stock data");
        }
        setStockData([]);
      });
  }, [selectedStock]);

  return (
    <div className="w-full flex flex-col items-center gap-4 px-4">
      <h2 className="text-xl font-bold">Stock Price Viewer</h2>
      <select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
        className="bg-neutral-800 border border-neutral-600 rounded-full px-4 py-2"
      >
        <option value="AAPL">AAPL</option>
        <option value="GOOGL">GOOGL</option>
        <option value="MSFT">MSFT</option>
      </select>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : stockData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}