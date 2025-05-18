import { Character } from "@/app/types/character";
import Image from "next/image";

type Props = {
  character: Character;
  isSelected?: boolean;
  onSelect?: () => void;
  selectedBy?: 1 | 2;
};

const getSelectionStyles = (selectedBy?: 1 | 2): string => {
  switch (selectedBy) {
    case 1:
      return "border-cyan-400 shadow-[0_0_20px_#0ff] ring-2 ring-cyan-500";
    case 2:
      return "border-pink-400 shadow-[0_0_20px_#f0f] ring-2 ring-pink-500";
    default:
      return "border-gray-700";
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Alive":
      return "bg-green-400";
    case "Dead":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const CharacterCard = ({
  character,
  isSelected,
  onSelect,
  selectedBy,
}: Props) => {
  const borderStyle = isSelected
    ? getSelectionStyles(selectedBy)
    : "border-gray-700";
  const statusColor = getStatusColor(character.status);

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-md ${borderStyle} animation`}
    >
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="rounded mb-3 w-full object-cover"
      />

      <h3 className="text-lg font-semibold text-white text-center">
        {character.name}
      </h3>

      <p className="text-sm text-gray-300 text-center">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${
            statusColor.includes("green") ? "animate-pulse" : ""
          } ${statusColor}`}
        />
        {character.status} - {character.species}
      </p>
    </div>
  );
};

export default CharacterCard;
