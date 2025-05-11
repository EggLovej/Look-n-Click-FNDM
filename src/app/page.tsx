'use client'
import { use, useEffect, useState } from 'react'


export default function Home() {
  const [value, setValue] = useState<number | null>(42)

  useEffect(() => {
    fetch('http://localhost:8080/api/value')
      .then((res) => res.json())
      .then((data) => setValue(data.value))
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Value: <span className="text-[32px] font-bold">{value}</span>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
