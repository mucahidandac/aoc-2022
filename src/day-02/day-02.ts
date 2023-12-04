import { getInput, getLines } from "../utils/io";

type Move = "rock" | "paper" | "scissor";
type OpponentMove = "A" | "B" | "C";
type OurMove = "X" | "Y" | "Z";
type OurDecodedMove = "draw" | "win" | "lose";

const OPPONENT_MOVE_MAP: Record<OpponentMove, Move> = {
  A: "rock",
  B: "paper",
  C: "scissor",
} as const;

const FIRST_PART_MOVE_MAP: Record<OurMove, Move> = {
  X: "rock",
  Y: "paper",
  Z: "scissor",
} as const;

const SECOND_PART_STRATEGY: Record<OurMove, OurDecodedMove> = {
  X: "lose",
  Y: "draw",
  Z: "win",
} as const;

const SECOND_PART_MOVE_MAP: Record<Move, Record<OurDecodedMove, Move>> = {
  // if opponent plays rock
  rock: {
    // if you need to lose
    lose: "scissor", // play scissor
    draw: "rock",
    win: "paper",
  },
  paper: {
    lose: "rock",
    draw: "paper",
    win: "scissor",
  },
  scissor: {
    lose: "paper",
    draw: "scissor",
    win: "rock",
  },
} as const;

const SCORE_SYSTEM: Record<Move, Record<Move, number>> = {
  rock: {
    paper: 6,
    rock: 3,
    scissor: 0,
  },
  paper: {
    paper: 3,
    rock: 0,
    scissor: 6,
  },
  scissor: {
    paper: 0,
    rock: 6,
    scissor: 3,
  },
} as const;

const SELECTION_POINTS: Record<Move, number> = {
  rock: 1,
  paper: 2,
  scissor: 3,
} as const;

class Round {
  public opponentMove: Move;
  public ourFirstMove: Move;
  public ourSecondMove: Move;

  constructor(private line: string, public lineIndex: number) {
    const [left, right] = this.line.trim().split(/\s+/g);
    this.opponentMove = OPPONENT_MOVE_MAP[left as OpponentMove];
    this.ourFirstMove = FIRST_PART_MOVE_MAP[right as OurMove];
    this.ourSecondMove =
      SECOND_PART_MOVE_MAP[this.opponentMove][
        SECOND_PART_STRATEGY[right as OurMove]
      ];
  }

  getFirstScore() {
    return (
      SCORE_SYSTEM[this.opponentMove][this.ourFirstMove] +
      SELECTION_POINTS[this.ourFirstMove]
    );
  }

  getSecondScore() {
    return (
      SCORE_SYSTEM[this.opponentMove][this.ourSecondMove] +
      SELECTION_POINTS[this.ourSecondMove]
    );
  }
}

class Game {
  private rounds: Round[];
  constructor(lines: string[]) {
    this.rounds = lines.map((line, i) => new Round(line, i));
  }
  getFirstTotalScore() {
    return this.rounds.reduce((acc, round) => acc + round.getFirstScore(), 0);
  }
  getSecondTotalScore() {
    return this.rounds.reduce((acc, round) => acc + round.getSecondScore(), 0);
  }
}

export function part1(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const game = new Game(getLines(input));
  return game.getFirstTotalScore();
}
export function part2(inputFileName: string): number {
  const input = getInput(__dirname, inputFileName);
  const game = new Game(getLines(input));
  return game.getSecondTotalScore();
}
