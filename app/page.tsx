"use client";

import { useState } from "react";
import MovieCard from "./components/MovieCard";

const allMovies = Array.from({ length: 150 }).map((_, i) => ({
  id: i + 1,
  title: `Film ${i + 1}`,
  age: i % 3 === 0 ? "7-10" : i % 3 === 1 ? "11-14" : "10-13",
  genre: i % 4 === 0 ? "Sarguzasht" : i % 4 === 1 ? "Fantastika" : i % 4 === 2 ? "Aksiya" : "Multfilm",
  image: `https://picsum.photos/300/450?random=${i + 1}`,
}));

export default function Home() {
  const [search, setSearch] = useState("");

  const movies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold">🎬 Kino Sayt</h1>
        <p className="text-gray-400 mt-2">150+ film va multfilm</p>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Film qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 w-[80%] md:w-[40%] px-4 py-3 rounded-full bg-zinc-900 border border-zinc-700 outline-none focus:border-cyan-500"
        />
      </section>

      {/* MOVIES */}
      <section className="px-6 md:px-12 py-10">

        <h2 className="text-xl font-bold mb-5">
          Natijalar: {movies.length}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

      </section>
    </main>
  );
}