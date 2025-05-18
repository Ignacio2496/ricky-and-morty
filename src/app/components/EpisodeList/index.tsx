import { Episode } from "@/app/types/episode";

type Props = {
  title?: string;
  episodes?: Episode[];
  isSharedList?: boolean;
};

const EpisodeList = ({ title, isSharedList, episodes }: Props) => {
  const text = () => {
    if (!title) {
      return isSharedList
        ? "No matching found yet"
        : "Please choose a character";
    }
    return title;
  };
  return (
    <div key={title} className="border border-gray-700 rounded p-4">
      <h3 className="text-lg font-semibold mb-3 text-cyan-300">{text()}</h3>
      {episodes?.length === 0 ? (
        <p className="text-gray-500 text-sm">No episodes</p>
      ) : (
        <ul className="space-y-2">
          {episodes?.map((ep) => (
            <li key={ep?.id ?? "-"} className="text-gray-300 text-sm">
              <span className="block font-medium">{ep.name}</span>
              <span className="text-xs text-gray-500">
                {ep.episode} • {ep.air_date}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EpisodeList;
