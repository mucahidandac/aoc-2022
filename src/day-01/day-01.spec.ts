
import { part1, part2 } from "./day-01";

describe("day-01", () => {
  it("part 1", () => {
    expect(part1("./day-01-part-01.example.txt")).toBe(24000);
    expect(part1("./day-01.txt")).toBe(69528);
  });
  it("part 2", () => {
    expect(part2("./day-01-part-02.example.txt")).toBe(45000);
    expect(part2("./day-01.txt")).toBe(206152);
  });
});
