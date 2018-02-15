import React, { Component } from "react";
import { Grid } from "./components/Grid";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Background />
        <Grid />
        <Footer />
      </div>
    );
  }
}

export default App;
