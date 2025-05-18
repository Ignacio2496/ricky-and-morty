import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // ✅ Esto es lo que faltaba
  },
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
  },
};

export default createJestConfig(customJestConfig);
