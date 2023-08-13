export interface PatternProps {
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

export interface DrawGridProps {
  grid: number[][];
  ctx: CanvasRenderingContext2D | null | undefined;
  cellSize: number;
  offset: IOffset;
  cellColor: string;
}

export interface IOffset {
  x: number;
  y: number;
}

export interface IGameContext {
  cellColor: string;
  cellSize: number;
  generationCount: number;
  isRunning: boolean;
  overlayCellColor: string;
  pattern: number[][] | null;
  speed: number;
}
