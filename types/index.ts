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

export interface CanvasProps {
  cellSize: number;
  pattern: number[][] | null;
  isRunning: boolean;
}

export interface DrawGridProps {
  grid: number[][];
  ctx: CanvasRenderingContext2D | null | undefined;
  cellSize: number;
  canvasWidth: number;
  canvasHeight: number;
  offset: IOffset;
}

export interface IOffset {
  x: number;
  y: number;
}
