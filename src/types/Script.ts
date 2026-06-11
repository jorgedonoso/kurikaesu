// TODO: Maybe add radicals, N5, or more?
export const SCRIPT_OPTIONS = [
  "Katakana",
  "Hiragana",
  "214 Classic Radicals",
  "All",
] as const;

// Uses single truth above to generate Options[] and type Script.
export type Script = (typeof SCRIPT_OPTIONS)[number];
