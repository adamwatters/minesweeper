import { Component } from "react";
import _ from "lodash";

const WIDTH = 16;
const HEIGHT = 10;
const MINE_CHANCE = 0.1;
const DIRECTIONS = [
  { dx: -1, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 1, dy: 1 }
];

function createBoard(width, height) {
  const boardWithMines = _.times(height, () =>
    _.times(width, () => {
      return {
        open: false,
        contents: Math.random() < MINE_CHANCE ? "mine" : ""
      };
    })
  );
  const boardWithMineAndNumbers = addNumbers(boardWithMines);
  return boardWithMineAndNumbers;
}

function addNumbers(board) {
  return board.map((row, y) => {
    return row.map((space, x) => {
      switch (space.contents) {
        case "mine":
          return { ...space };
        default:
          const mineCount = adjacentMineCount(x, y, board);
          if (mineCount === 0) {
            return { ...space };
          }
          return {
            ...space,
            contents: mineCount
          };
      }
    });
  });
}

function coordinatesForFloodOpen(x, y, board) {
  const coordinates = [];
  // define function to call recursively
  const getAdjacents = (innerX, innerY) => {
    // get spaces adjacent to origin
    const adjacents = getAdjacentCoordinates(innerX, innerY, board);
    // push those spaces to
    coordinates.push(adjacents);
    // filter out spaces already visited
    adjacents
      .filter(
        adjacent =>
          !coordinates.some(
            coordinate =>
              coordinate.x === adjacent.x && coordinate.y === adjacent.y
          )
      )
      // if space is empty, call getAdjacents recursively
      .forEach(adjacent => {
        if (getSpace(adjacent.x, adjacent.y, board).contents === "") {
          getAdjacents(adjacent.x, adjacent.y);
        }
      });
  };
  // initial call to start recursive search
  getAdjacents(x, y);
  return coordinates;
}

function adjacentMineCount(x, y, board) {
  return getAdjacentCoordinates(x, y, board).filter(adjacent => {
    return getSpace(adjacent.x, adjacent.y, board).contents === "mine";
  }).length;
}

function getAdjacentCoordinates(x, y, board) {
  return DIRECTIONS.map(({ dx, dy }) => {
    return {
      x: x + dx,
      y: y + dy
    };
  }).filter(({ x, y }) => {
    return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
  });
}

function getSpace(x, y, board) {
  return board[y][x];
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      board: createBoard(WIDTH, HEIGHT),
      gameOver: false
    };
  }

  openSpaces(coordinateSets) {
    const boardCopy = [...this.state.board];
    coordinateSets.forEach(({ x, y }) => {
      const spaceFromBoard = getSpace(x, y, boardCopy);
      spaceFromBoard.open = true;
    });
    this.setState({ board: boardCopy });
  }

  handleSpaceClick = (x, y) => {
    const spaceClicked = getSpace(x, y, this.state.board);
    switch (spaceClicked.contents) {
      case "":
        // const spacesToOpen = methodForFindingCoordinatesToFloodOpen
        // this.openSpaces(spacesToOpen);
        break;
      case "mine":
        this.setState({
          gameOver: true
        });
        break;
      default:
        this.openSpaces([{ x, y }]);
    }
  };

  render() {
    return this.props.boardRenderer({
      board: this.state.board,
      gameOver: this.state.gameOver,
      handleSpaceClick: this.handleSpaceClick
    });
  }
}

export { Game };
