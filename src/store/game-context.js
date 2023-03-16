import {createContext} from "react";

const GameContext = createContext({
  game: {
    field: [],
    turnCount: 0,
    currentPlayer: 'X',
    winner: undefined
  },
  onTurn: () => {
  },
  onWin: () => {
  }
})

export default GameContext