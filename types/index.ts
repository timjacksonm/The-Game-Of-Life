export interface PatternProps {
  select?: string;
  offset?: number;
  limit?: number;
  value?: string;
}

export interface Pattern {
  _id: string;
  title?: string;
  author?: string;
  desccription?: string;
  size?: {
    x: number;
    y: number;
  };
  rleString?: string;
  favorite?: boolean;
}

export interface PatternResponse {
  results: Pattern[];
  totalCount: number;
}

export interface PatternAPIError {
  message?: {
    errors?: ErrorObject[];
  };
}

export interface ErrorObject {
  location?: string;
  msg?: string;
  path?: string;
  type?: string;
  value?: string;
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
  aliveCount: number;
}

export interface GameActions {
  startGame: () => void;
  stopGame: () => void;
  clearGrid: () => void;
}
