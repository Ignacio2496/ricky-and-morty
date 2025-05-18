import { ReactNode } from "react";
import { CharacterProvider } from "@/contexts/CharacterContext";
import { Toaster } from "react-hot-toast";

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CharacterProvider>
      {children}
      <Toaster position="top-center" />
    </CharacterProvider>
  );
}
