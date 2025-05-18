import { render, screen } from "@testing-library/react";
import EpisodeList from "..";
import { Episode } from "@/app/types/episode";

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
  },
  {
    id: 2,
    name: "Lawnmower Dog",
    air_date: "December 9, 2013",
    episode: "S01E02",
  },
];

describe("EpisodeList", () => {
  it("renders message when no title and not shared", () => {
    render(<EpisodeList isSharedList={false} />);
    expect(screen.getByText("Please choose a character")).toBeInTheDocument();
  });

  it("renders message when no title and shared", () => {
    render(<EpisodeList isSharedList={true} />);
    expect(screen.getByText("No matching found yet")).toBeInTheDocument();
  });

  it("renders 'No episodes' when episode list is empty", () => {
    render(<EpisodeList title="Test List" episodes={[]} />);
    expect(screen.getByText("No episodes")).toBeInTheDocument();
  });

  it("renders episode list", () => {
    render(<EpisodeList title="Test List" episodes={mockEpisodes} />);
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("S01E01 • December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
    expect(screen.getByText("S01E02 • December 9, 2013")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<EpisodeList title="Shared Episodes" episodes={mockEpisodes} />);
    expect(screen.getByText("Shared Episodes")).toBeInTheDocument();
  });
});
