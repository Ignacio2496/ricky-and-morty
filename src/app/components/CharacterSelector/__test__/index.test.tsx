import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Character } from "@/app/types/character";
import { useCharacterContext } from "@/contexts/CharacterContext";
import CharacterSelector from "..";

// 🧪 Mock del contexto
jest.mock("@/contexts/CharacterContext", () => ({
  useCharacterContext: jest.fn(),
}));

// 🧪 Mock de toast
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "https://rick.com/avatar.jpg",
    episode: [],
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    image: "https://morty.com/avatar.jpg",
    episode: [],
  },
];

// 🧪 Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: mockCharacters }),
  })
) as jest.Mock;

describe("CharacterSelector", () => {
  const setCharacter1 = jest.fn();
  const setCharacter2 = jest.fn();

  beforeEach(() => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      character1: null,
      character2: null,
      setCharacter1,
      setCharacter2,
    });
  });

  it("renders character cards", () => {
    render(
      <CharacterSelector
        selectorId={1}
        label="Select Character 1"
        initialCharacters={mockCharacters}
      />
    );
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.getByText("Select Character 1")).toBeInTheDocument();
  });

  it("selects a character when clicked", () => {
    render(
      <CharacterSelector
        selectorId={1}
        label="Select Character"
        initialCharacters={mockCharacters}
      />
    );
    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(setCharacter1).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it("changes page when next button is clicked", async () => {
    render(
      <CharacterSelector
        selectorId={1}
        label="Select Character"
        initialCharacters={mockCharacters}
      />
    );
    fireEvent.click(screen.getByText("Next"));
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character?page=2"
      )
    );
  });

  it("disables prev button on page 1", () => {
    render(
      <CharacterSelector
        selectorId={1}
        label="Select Character"
        initialCharacters={mockCharacters}
      />
    );
    fireEvent.click(screen.getByText("Prev"));
    expect(screen.getByText("Page 1")).toBeInTheDocument();
  });
});
