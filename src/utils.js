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

export default defaultGrid;
