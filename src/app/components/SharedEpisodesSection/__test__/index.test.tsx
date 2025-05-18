import { render, screen, waitFor } from "@testing-library/react";
import { useCharacterContext } from "@/contexts/CharacterContext";
import { Character } from "@/app/types/character";
import SharedEpisodesSection from "..";

jest.mock("@/contexts/CharacterContext", () => ({
  useCharacterContext: jest.fn(),
}));

jest.mock("@/app/components/EpisodeList", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid="EpisodeList">{title}</div>
  ),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Pilot",
          air_date: "December 2, 2013",
          episode: "S01E01",
        },
      ]),
  })
) as jest.Mock;

const mockCharacter = (
  id: number,
  name: string,
  episodeIds: number[]
): Character => ({
  id,
  name,
  status: "Alive",
  species: "Human",
  image: "",
  episode: episodeIds.map(
    (id) => `https://rickandmortyapi.com/api/episode/${id}`
  ),
});

describe("SharedEpisodesSection", () => {
  beforeEach(() => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      character1: mockCharacter(1, "Rick", [1, 2]),
      character2: mockCharacter(2, "Morty", [2, 3]),
    });

    jest.clearAllMocks();
  });

  it("renders episode sections with correct titles", async () => {
    render(<SharedEpisodesSection />);

    await waitFor(() => {
      expect(screen.getByText("Rick - Only Episodes")).toBeInTheDocument();
      expect(screen.getByText("Shared Episodes")).toBeInTheDocument();
      expect(screen.getByText("Morty - Only Episodes")).toBeInTheDocument();
    });
  });

  it("calls fetch 3 times for character1, character2, and shared", async () => {
    render(<SharedEpisodesSection />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);

      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/episode/1,2"
      );
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/episode/2,3"
      );
      expect(global.fetch).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/episode/2"
      );
    });
  });
});
