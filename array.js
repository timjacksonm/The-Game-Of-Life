const rows = 10;
const columns = 8;

const myArray1 = [];

for (let i = 0; i < rows; i++) {
  myArray1[i] = [];
  for (let j = 0; j < columns; j++) {
    myArray1[i][j] = null;
  }
}

console.log(myArray1);
