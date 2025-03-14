import { useState, useEffect } from "react";

interface PrimesListProps {
  number: number;
}

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function generatePrimes(num: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= num; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

export default function PrimesList({ number: initialNumber }: PrimesListProps) {
  const [number, setNumber] = useState<number>(initialNumber);
  const [reversed, setReversed] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const numParam = params.get("number");
    if (numParam) {
      const parsedNum = Number(numParam);
      if (!isNaN(parsedNum) && parsedNum > 0) {
        setNumber(parsedNum);
      }
    }
  }, []);

  const primes = generatePrimes(number);
  const primesToShow = reversed ? [...primes].reverse() : primes;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-96">
      <h1 className="text-2xl font-semibold mb-4">Números primos hasta {number}</h1>
      <div className="grid grid-cols-3 gap-4">
        {primesToShow.map((prime) => (
          <span key={prime} className="p-2 bg-gray-200 rounded">{prime}</span>
        ))}
      </div>
      <button
        onClick={() => setReversed(!reversed)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded"
      >
        Revertir el orden 🔄
      </button>
    </div>
  );
}
