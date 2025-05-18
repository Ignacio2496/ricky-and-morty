"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useCharacterContext } from "@/contexts/CharacterContext";
import { Character } from "@/app/types/character";
import CharacterCard from "../CharacterCard";

type Props = {
  selectorId: 1 | 2;
  label: string;
  initialCharacters: Character[];
};

const CharacterSelector = ({ selectorId, label, initialCharacters }: Props) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [page, setPage] = useState(1);

  const { character1, character2, setCharacter1, setCharacter2 } =
    useCharacterContext();

  const selectedCharacter = selectorId === 1 ? character1 : character2;
  const setSelectedCharacter = selectorId === 1 ? setCharacter1 : setCharacter2;
  const otherCharacter = selectorId === 1 ? character2 : character1;

  const fetchCharacters = async (pageNumber: number) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await res.json();
      setCharacters(data.results);
    } catch (err) {
      toast.error(`Error fetching characters: ${err}`);
    }
  };

  useEffect(() => {
    if (page === 1) {
      setCharacters(initialCharacters);
    } else {
      fetchCharacters(page);
    }
  }, [page, initialCharacters]);

  const handleSelect = (char: Character) => {
    if (otherCharacter?.id === char.id) {
      toast.error("Ey! You can't select the same character twice");
      return;
    }
    setSelectedCharacter(char);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-8 w-full flex justify-center">
        {label}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            isSelected={selectedCharacter?.id === char.id}
            onSelect={() => handleSelect(char)}
            selectedBy={
              selectedCharacter?.id === char.id ? selectorId : undefined
            }
          />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700"
        >
          Prev
        </button>
        <span className="text-gray-400">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterSelector;
