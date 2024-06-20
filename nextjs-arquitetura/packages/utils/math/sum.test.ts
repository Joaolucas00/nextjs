import { sum } from "./sum";

describe("sum()", () => {
  test("Deve retornar 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
