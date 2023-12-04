import { getInput, getLines } from "../utils/io";

function calculateCalories(lines: string[]): number[] {
  let elfId = 0;
  const calories: number[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      elfId++;
    } else {
      if (!calories[elfId]) {
        calories[elfId] = 0;
      }
      calories[elfId] += Number(line.trim());
    }
  }
  return calories;
}

export function part1(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const lines = getLines(input);
  const calories = calculateCalories(lines);
  return Math.max(...calories);
}
export function part2(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const lines = getLines(input);
  const sortedCalories = calculateCalories(lines).toSorted((a, b) => b - a);
  return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
}
