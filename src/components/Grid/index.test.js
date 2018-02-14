import { GridLogic } from ".";

describe("game logic", () => {
  describe("grid initialization", () => {
    it("works", () => {
      const grid = new GridLogic(10);
      expect(grid.raw).toHaveLength(10);
      grid.raw.forEach(column => {
        column.forEach(cell => expect(cell).toBe(false));
      });
    });
  });

  describe("grid operations", () => {
    let grid;
    beforeEach(() => {
      grid = new GridLogic(5);
    });

    it("allows setting a cell alive", () => {
      grid.setCellAlive(3, 3);
      expect(grid.raw[3][3]).toBe(true);
    });

    it("allows killing a cell", () => {
      grid.setCellAlive(3, 3);
      expect(grid.raw[3][3]).toBe(true);
      grid.setCellDead(3, 3);
      expect(grid.raw[3][3]).toBe(false);
    });

    describe("next cell state", () => {
      it("applies all the rules", () => {
        grid.setCellAlive(1, 0);
        grid.setCellAlive(1, 1);
        grid.nextState();
        expect(grid.raw[1][1]).toBe(false);
      });

      describe("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation", () => {
        it("kills a cell", () => {
          grid.setCellAlive(1, 0);
          grid.setCellAlive(1, 1);
          grid._initPrevState();
          const state = grid._nextCellState(1, 0);
          expect(state).toBe(false);
        });

        it("doesnt kill it if multiple neightbours", () => {
          grid.setCellAlive(1, 0);
          grid.setCellAlive(1, 1);
          grid.setCellAlive(0, 1);
          grid._initPrevState();
          const state = grid._nextCellState(1, 1);
          expect(state).toBe(true);
        });
      });
    });
  });
});
