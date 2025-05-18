"use client";

import { Episode } from "@/app/types/episode";
import { useCharacterContext } from "@/contexts/CharacterContext";
import { useEffect, useState } from "react";
import EpisodeList from "../EpisodeList";

const SharedEpisodesSection = () => {
  const { character1, character2 } = useCharacterContext();

  const [episodes1Only, setEpisodes1Only] = useState<Episode[]>([]);
  const [episodes2Only, setEpisodes2Only] = useState<Episode[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (!character1) return;

    const ids = character1.episode.map((url) => url.split("/").pop()!);
    fetch(`https://rickandmortyapi.com/api/episode/${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data : [data];
        setEpisodes1Only(normalized);
      });
  }, [character1]);

  useEffect(() => {
    if (!character2) return;

    const ids = character2.episode.map((url) => url.split("/").pop()!);
    fetch(`https://rickandmortyapi.com/api/episode/${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data : [data];
        setEpisodes2Only(normalized);
      });
  }, [character2]);

  useEffect(() => {
    if (!character1 || !character2) {
      setSharedEpisodes([]);
      return;
    }

    const ids1 = character1.episode.map((u) => u.split("/").pop()!);
    const ids2 = character2.episode.map((u) => u.split("/").pop()!);
    const shared = ids1.filter((id) => ids2.includes(id));

    fetch(`https://rickandmortyapi.com/api/episode/${shared.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data : [data];
        setSharedEpisodes(normalized);
      });
  }, [character1, character2]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <EpisodeList
        key={"character1"}
        title={character1 ? `${character1.name} - Only Episodes` : undefined}
        episodes={episodes1Only}
      />
      <EpisodeList
        key={"sharedEpisdes"}
        title="Shared Episodes"
        isSharedList={true}
        episodes={sharedEpisodes}
      />
      <EpisodeList
        key={"character2"}
        title={character2 ? `${character2.name} - Only Episodes` : undefined}
        episodes={episodes2Only}
      />
    </div>
  );
};

export default SharedEpisodesSection;
