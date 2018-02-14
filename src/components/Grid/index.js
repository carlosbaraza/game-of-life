import React from "react";

export function GridLogic(size = 5) {
  this.raw = [];
  for (let i = 0; i < size; i++) {
    let column = [];
    for (let j = 0; j < size; j++) {
      column.push(false);
    }
    this.raw.push(column);
  }
  return this;
}

GridLogic.prototype = {
  setCellAlive(i, j) {
    this.raw[i][j] = true;
  },

  setCellDead(i, j) {
    this.raw[i][j] = false;
  },

  _firstRule(i, j) {
    if (!this.prevState[i][j]) return false;

    let countAliveNeighbours = 0;

    const minColumn = i - 1 < 0 ? 0 : i - 1;
    const maxColumn =
      i + 1 > this.prevState.length - 1 ? this.prevState.length - 1 : i + 1;

    for (let column = minColumn; column <= maxColumn; column++) {
      const minRow = j - 1 < 0 ? 0 : j - 1;
      const maxRow =
        j + 1 > this.prevState[column].length - 1
          ? this.prevState[column].length - 1
          : j + 1;

      for (let row = minRow; row <= maxRow; row++) {
        if (this.prevState[column][row] && !(column === i && row === j))
          countAliveNeighbours++;
      }
    }

    if (countAliveNeighbours < 2) return false;
    else return this.prevState[i][j];
  },

  _nextCellState(i, j) {
    return this._firstRule(i, j);
  },

  _initPrevState() {
    this.prevState = this.raw;
    this.raw = this.prevState.map(column => column.slice(0)); // clone state
  },

  nextState() {
    this._initPrevState();

    for (let column = 0; column < this.raw.length; column++) {
      for (let row = 0; row < this.raw[column].length; row++) {
        const nextCellState = this._nextCellState(column, row);

        if (nextCellState) this.setCellAlive(column, row);
        else this.setCellDead(column, row);
      }
    }
    return this;
  }
};

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: new GridLogic()
    };

    this.state.grid.setCellAlive(2, 1);
    this.state.grid.setCellAlive(2, 2);
    this.state.grid.setCellAlive(2, 3);
  }

  nextState() {
    this.setState({
      grid: this.state.grid.nextState()
    });
  }

  render() {
    const { grid } = this.state;

    return (
      <div>
        <button onClick={() => this.nextState()}>next</button>
        {grid.raw.map(column => {
          return (
            <div className="column">
              {column.map(cell => <span className={cell ? "alive" : "dead"} />)}
            </div>
          );
        })}
      </div>
    );
  }
}
