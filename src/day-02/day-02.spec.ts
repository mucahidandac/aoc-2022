
import { part1, part2 } from "./day-02";

describe("day-02", () => {
  it("part 1", () => {
    expect(part1("./day-02-part-01.example.txt")).toBe(15);
    expect(part1("./day-02.txt")).toBe(11475);
  });
  it("part 2", () => {
    expect(part2("./day-02-part-02.example.txt")).toBe(12);
    expect(part2("./day-02.txt")).toBe(16862);
  });
});
