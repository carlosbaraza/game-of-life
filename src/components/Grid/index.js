import React from "react";
import "./index.css";

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
  setCell(i, j, value) {
    if (value !== true && value !== false)
      throw new Error("Only accepted true or false values");
    this.raw[i][j] = value;
  },

  setCellAlive(i, j) {
    this.raw[i][j] = true;
  },

  setCellDead(i, j) {
    this.raw[i][j] = false;
  },

  _nextCellState(i, j) {
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

    // 1st rule
    if (countAliveNeighbours < 2) return false;

    // 3rd rule
    if (countAliveNeighbours > 3) return false;

    // 4th rule
    if (countAliveNeighbours === 3 && !this.prevState[i][j]) return true;
    else {
      // 2nd rule
      return this.prevState[i][j];
    }
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
      grid: new GridLogic(15)
    };

    this.state.grid.setCellAlive(9, 5);
    this.state.grid.setCellAlive(9, 6);
    this.state.grid.setCellAlive(9, 7);
    this.state.grid.setCellAlive(9, 8);
    this.state.grid.setCellAlive(9, 9);
    this.state.grid.setCellAlive(10, 5);
    this.state.grid.setCellAlive(10, 6);
    this.state.grid.setCellAlive(10, 8);
    this.state.grid.setCellAlive(10, 9);
  }

  nextState() {
    this.setState({
      grid: this.state.grid.nextState()
    });
  }

  toggleCellState(column, row) {
    this.state.grid.setCell(column, row, !this.state.grid.raw[column][row]);
    this.setState({}); // Force Update
  }

  renderColumn = (column, columnIndex) => {
    return (
      <div key={`column-${columnIndex}`} className="Grid__Column">
        {column.map(this.renderCell.bind(this, columnIndex))}
      </div>
    );
  };

  renderCell(columnIndex, cell, rowIndex) {
    const cellState = cell ? "alive" : "dead";
    return (
      <span
        key={`column-${columnIndex}-row-${rowIndex}`}
        className={`Grid__GridCell Grid__GridCell--${cellState}`}
        title={`${cellState} (Column: ${columnIndex}, Row: ${rowIndex})`}
        onClick={this.toggleCellState.bind(this, columnIndex, rowIndex)}
      />
    );
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="Grid">
        <button onClick={() => this.nextState()}>Next tick</button>
        {grid.raw.map(this.renderColumn)}
      </div>
    );
  }
}
