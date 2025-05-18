import { Character } from "@/app/types/character";
import { render, screen, fireEvent } from "@testing-library/react";

import CharacterCard from "..";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
};

describe("CharacterCard", () => {
  it("renders character info", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("applies correct status color", () => {
    render(<CharacterCard character={mockCharacter} />);
    const statusDot = screen.getByText(/Alive - Human/i).querySelector("span");
    expect(statusDot).toHaveClass("bg-green-400");
  });

  it("calls onSelect when clicked", () => {
    const handleSelect = jest.fn();
    render(<CharacterCard character={mockCharacter} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("shows border styles if selected by 1 or 2", () => {
    const { rerender } = render(
      <CharacterCard character={mockCharacter} isSelected selectedBy={1} />
    );
    let card = screen.getByText("Rick Sanchez").closest("div");
    expect(card).toHaveClass("border-cyan-400");

    rerender(
      <CharacterCard character={mockCharacter} isSelected selectedBy={2} />
    );
    card = screen.getByText("Rick Sanchez").closest("div");
    expect(card).toHaveClass("border-pink-400");
  });
});
