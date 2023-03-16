import GameContext from "./game-context";
import {useReducer} from "react";

const INITIAL_STATE = {
  field: [undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined],
  turnCount: 0,
  currentPlayer: 'X',
  winner: undefined
}

const WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], [2, 4, 6]]

const checkWinner = field => {

  for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
    const [firstMatch, secondMatch, thirdMatch] = WIN_COMBINATIONS[i]
    if (field[firstMatch] && field[firstMatch] === field[secondMatch]
        && field[secondMatch] === field[thirdMatch]) {
      return field[firstMatch]
    }
  }

  if (field.every((fieldVal) => fieldVal !== undefined)) {
    return '-'
  }

  return undefined
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ON_TURN':
      if (state.field[action.fieldId]) {
        return state
      }

      const updatedState = {...state}
      updatedState.field = updatedState.field.map((value, i) => {
        if (i === action.fieldId) {
          return updatedState.currentPlayer
        } else {
          return value
        }
      })

      const winner = checkWinner(updatedState.field)
      if (winner) {
        updatedState.winner = winner
        return updatedState
      }

      updatedState.turnCount++
      updatedState.currentPlayer = updatedState.currentPlayer === 'X' ? 'O'
          : 'X'
      return updatedState
    case 'RESET_GAME':
      return INITIAL_STATE
    default:
      return state
  }
}

const GameContextProvider = (props) => {
  const [gameState, dispatchGameAction] = useReducer(gameReducer, INITIAL_STATE,
      undefined)

  const onTurnHandler = fieldId => {
    dispatchGameAction({type: 'ON_TURN', fieldId})
  }

  const onWinHandler = () => {
    dispatchGameAction({type: 'RESET_GAME'})
  }

  const gameContext = {
    game: gameState,
    onTurn: onTurnHandler,
    onWin: onWinHandler
  }

  return <GameContext.Provider value={gameContext}>
    {props.children}
  </GameContext.Provider>
}

export default GameContextProvider