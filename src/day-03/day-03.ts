import { getInput, getLines } from "../utils/io";

function normalizeCharCode(char: string) {
  let charCode = char.charCodeAt(0);
  if (97 <= charCode && charCode <= 122) {
    // [a-z] normalize to 1-26 from 97-122
    charCode -= 96;
  } else if (65 <= charCode && charCode <= 90) {
    // [A-Z] normalize to 27-52 from 65-90
    charCode -= 38;
  }
  return charCode;
}

class SingleRucksack {
  public char: string = "";

  constructor(public line: string, public index: number) {
    const dividerIndex = Math.floor(line.length / 2);
    const left = line.slice(0, dividerIndex).split("");
    const right = line.slice(dividerIndex, line.length).split("");
    this.char = left.find(c => right.includes(c))!;
  }

  getPriority() {
    return normalizeCharCode(this.char);
  }
}

class TrioRucksack {
  public char: string = "";

  constructor(
    public lines: [string, string, string],
    public trioIndex: number
  ) {
    const [line1, line2, line3] = lines.map((line) => line.split(""));
    this.char = line1.find((c) => line2.includes(c) && line3.includes(c))!;
  }

  getPriority() {
    return normalizeCharCode(this.char);
  }
}
class Game {
  private singleRucksacks: SingleRucksack[];
  private trioRucksacks: TrioRucksack[];
  constructor(lines: string[]) {
    this.singleRucksacks = [];
    this.trioRucksacks = [];
    for (let i = 0; i < lines.length - 2; i += 3) {
      this.singleRucksacks.push(new SingleRucksack(lines[i], i));
      this.singleRucksacks.push(new SingleRucksack(lines[i+1], i+1));
      this.singleRucksacks.push(new SingleRucksack(lines[i+2], i+2));
      this.trioRucksacks.push(
        new TrioRucksack(
          [lines[i], lines[i + 1], lines[i + 2]],
          Math.floor(i / 3)
        )
      );
    }
  }

  getPrioritiesSingle() {
    return this.singleRucksacks.reduce(
      (acc, rucksack) => acc + rucksack.getPriority(),
      0
    );
  }
  getPrioritiesTrio() {
    return this.trioRucksacks.reduce(
      (acc, rucksack) => acc + rucksack.getPriority(),
      0
    );
  }
}

export function part1(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const game = new Game(getLines(input));
  return game.getPrioritiesSingle();
}
export function part2(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const game = new Game(getLines(input));
  return game.getPrioritiesTrio();
}
