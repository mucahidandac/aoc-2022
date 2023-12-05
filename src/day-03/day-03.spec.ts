
import { part1, part2 } from "./day-03";

describe("day-03", () => {
  it("part 1", () => {
    expect(part1("./day-03-part-01.example.txt")).toBe(157);
    expect(part1("./day-03.txt")).toBe(8401);
  });
  it("part 2", () => {
    expect(part2("./day-03-part-02.example.txt")).toBe(70);
    expect(part2("./day-03.txt")).toBe(2641);
  });
});
