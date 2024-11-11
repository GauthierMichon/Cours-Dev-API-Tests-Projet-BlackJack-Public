export default {
  preset: "ts-jest", // Utilise ts-jest pour transpiler TypeScript
  testEnvironment: "node", // Utilise l'environnement de test pour Node.js
  roots: ["<rootDir>/src"], // Dossier source pour les tests
  testMatch: ["**/__tests__/**/*.(ts|js)", "**/?(*.)+(spec|test).(ts|js)"], // Les fichiers de tests
  moduleFileExtensions: ["ts", "js"],
};
