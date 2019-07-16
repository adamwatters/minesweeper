import React, { Component } from "react";
import { BoardView } from "./BoardView.js";
import { Game } from "./Game.js";
import "./App.css";

export default class App extends Component {
  render() {
    return <Game boardRenderer={BoardView} />;
  }
}
