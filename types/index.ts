export interface patternProps {
  select?: string;
  offset?: number;
  limit?: number;
}

export interface PatternResponse {
  size?: {
    x: number;
    y: number;
  };
  _id: string;
  title?: string;
  description?: string[];
  rleString?: string;
  createdAt?: string;
}
