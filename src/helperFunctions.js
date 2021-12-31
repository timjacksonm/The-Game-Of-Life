export const create2dArray = (rows, columns) => {
  const myArray = [];

  for (let i = 0; i < rows; i++) {
    myArray[i] = [];
    for (let j = 0; j < columns; j++) {
      myArray[i][j] = 0;
    }
  }
  return myArray;
};
