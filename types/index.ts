import { Dispatch, SetStateAction } from 'react';

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
  isRunning: boolean;
  setCellSize: Dispatch<SetStateAction<number>>;
  rangeRef: React.MutableRefObject<HTMLInputElement | null>;
  speed: number;
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
  overlayCellColor: string;
  cellColor: string;
  pattern: number[][] | null;
  setPattern: Dispatch<SetStateAction<number[][] | null>>;
}
