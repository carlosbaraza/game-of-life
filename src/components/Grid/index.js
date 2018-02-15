import React from "react";
import "./index.css";
import { GridLogic } from "./logic";

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

  togglePlay = () => {
    if (this.state.playIntervalHandler) {
      clearInterval(this.state.playIntervalHandler);
      this.setState({ playIntervalHandler: null });
    } else {
      const playIntervalHandler = setInterval(this.nextState.bind(this), 1000);
      this.setState({ playIntervalHandler });
    }
  };

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
        <p className="explanation">Click a cell to toggle LIFE or DEATH</p>
        {grid.raw.map(this.renderColumn)}
        <div>
          <button tabIndex={0} onClick={() => this.nextState()}>
            NEXT STEP
          </button>
          <button tabIndex={0} onClick={this.togglePlay}>
            {this.state.playIntervalHandler ? "■ PAUSE" : "▶ PLAY"}
          </button>
        </div>
      </div>
    );
  }
}
