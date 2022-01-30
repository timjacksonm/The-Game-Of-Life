function defaultGrid(windowSize, gridGap, cellSize) {
  return new Array(
    Math.floor((windowSize.height + gridGap) / (cellSize + gridGap))
  )
    .fill(0)
    .map(() =>
      new Array(
        Math.floor((windowSize.width + gridGap) / (cellSize + gridGap))
      ).fill(0)
    );
}

export function randomGrid(windowSize, gridGap, cellSize) {
  return new Array(
    Math.floor((windowSize.height + gridGap) / (cellSize + gridGap))
  )
    .fill(0)
    .map(() =>
      new Array(Math.floor((windowSize.width + gridGap) / (cellSize + gridGap)))
        .fill(0)
        .map(() => Math.floor(Math.random() * 2))
    );
}

export default defaultGrid;
