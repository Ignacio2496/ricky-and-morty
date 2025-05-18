"use client";

import { Character } from "@/app/types/character";
import { createContext, useContext, useState, ReactNode } from "react";

type CharacterContextType = {
  character1: Character | null;
  character2: Character | null;
  setCharacter1: (char: Character) => void;
  setCharacter2: (char: Character) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  return (
    <CharacterContext.Provider
      value={{ character1, character2, setCharacter1, setCharacter2 }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within CharacterProvider"
    );
  }
  return context;
};
