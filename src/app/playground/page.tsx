import Link from "next/link";
import CharacterSelector from "../components/CharacterSelector";
import SharedEpisodesSection from "../components/SharedEpisodesSection";
import { Character } from "../types/character";

const getInitialCharacters = async (): Promise<Character[]> => {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.results;
};

export default async function PlaygroundPage() {
  const initialCharacters = await getInitialCharacters();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black shadow-[0_0_10px_#0ff] hover:shadow-[0_0_20px_#0ff] transition duration-300"
        >
          ← back
        </Link>
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold drop-shadow-[0_0_10px_#0ff]">
            Playground
          </h1>
          <p className="text-gray-400">
            Explore characters from{" "}
            <span className="text-green-400">Rick and Morty</span> and discover
            unique and shared episodes.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CharacterSelector
            label="Character #1"
            selectorId={1}
            initialCharacters={initialCharacters}
          />
          <CharacterSelector
            label="Character #2"
            selectorId={2}
            initialCharacters={initialCharacters}
          />
        </section>

        <SharedEpisodesSection />
      </div>
    </main>
  );
}
