export type GameState = 'START' | 'CREATE_EGGY' | 'PLAZA' | 'UNPACK' | 'ISLAND';

export interface EggyConfig {
  color: string;
  elasticity: number;
}

export interface Trouble {
  id: string;
  text: string;
  color: string;
}

export const POSITIVE_PHRASES = [
  "你很棒！",
  "一起加油！",
  "抱抱你",
  "没关系的",
  "你是最勇敢的",
  "明天会更好"
];

export const THEME_COLORS = {
  primary: "#FFD93D", // Butter Yellow
  success: "#6BCB77", // Mint Green
  background: "#9B72AA", // Lavender Purple
  accent: "#FF6B6B", // Gummy Pink
  glass: "rgba(255, 255, 255, 0.2)"
};
