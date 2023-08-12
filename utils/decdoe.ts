export function decode(rleString: string, size: { x: number; y: number }): number[][] {
  const { x } = size;

  const expandRLE = (match: string, num: string, char: string) => char.repeat(Number(num));
  const replaceCharWithValue = (char: string, value: number, row: string) =>
    row.replace(new RegExp(char, 'g'), value.toString());
  const padRowWithZeros = (row: string[]) => row.concat(new Array(x - row.length).fill('0'));
  const toNumericArray = (row: string[]): number[] => row.map(Number);

  const decoded = rleString
    .slice(0, -1)
    .replace(/(\d+)(\D)/g, expandRLE)
    .split('$')
    .map((row) => replaceCharWithValue('o', 1, row))
    .map((row) => replaceCharWithValue('b', 0, row))
    .map((row) => row.split(''))
    .map((row) => (row.length < x ? padRowWithZeros(row) : row))
    .map(toNumericArray);

  return decoded;
}
