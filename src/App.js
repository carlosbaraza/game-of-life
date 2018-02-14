import React, { Component } from "react";
import { Grid } from "./components/Grid";
import { Background } from "./components/Background";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Background />
        <Grid />
      </div>
    );
  }
}

export default App;
