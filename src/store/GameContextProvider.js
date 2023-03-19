import GameContext from "./game-context"
import {useCallback, useReducer} from "react"

const INITIAL_STATE = {
  field: new Array(9).fill(undefined),
  turnCount: 0,
  currentPlayer: 'X',
  winner: undefined
}

const WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
  [2, 5, 8], [0, 4, 8], [2, 4, 6]]

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

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getCellIdForTheZeroPlayerTurn = (field) => {
  const emptyCellsIds = field.reduce((ids, cell, id) => {
    if (cell === undefined) {
      ids.push(id)
    }
    return ids
  }, []);
  const randomFreeCellId = getRandomInt(0, emptyCellsIds.length - 1)
  return emptyCellsIds[randomFreeCellId]
}

const getCellIdForZeroPlayerMedium = (field) => {
  for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
    const [firstMatch, secondMatch, thirdMatch] = WIN_COMBINATIONS[i]
    let cellId = undefined
    if (field[firstMatch] === 'X' && field[firstMatch] === field[secondMatch]) {
      cellId = thirdMatch
    }
    if (field[secondMatch] === 'X' && field[secondMatch]
        === field[thirdMatch]) {
      cellId = firstMatch
    }
    if (field[firstMatch] === 'X' && field[firstMatch] === field[thirdMatch]) {
      cellId = secondMatch
    }
    if (cellId !== undefined && field[cellId] === undefined) {
      return cellId
    }
  }

  return getCellIdForTheZeroPlayerTurn(field)
}

const updateCellForPlayer = (updatedState, fieldId) => {
  updatedState.field = updatedState.field.map((value, i) => {
    if (i === fieldId) {
      return updatedState.currentPlayer
    } else {
      return value
    }
  })
}

const checkAndSetWinner = (updatedState) => {
  if (updatedState.turnCount >= 4) {
    const winner = checkWinner(updatedState.field)
    if (winner) {
      updatedState.winner = winner
      return winner
    }
  }

  return undefined
}

const nextTurnRoutines = (updatedState) => {
  updatedState.turnCount++
  updatedState.currentPlayer = updatedState.currentPlayer === 'X' ? 'O'
      : 'X'
}

const gameReducer = (state, action) => {
  const updatedState = {...state}
  switch (action.type) {
    case 'ON_TURN':
      if (state.field[action.fieldId]) {
        return state
      }

      updateCellForPlayer(updatedState, action.fieldId)
      nextTurnRoutines(updatedState)
      if (checkAndSetWinner(updatedState)) {
        return updatedState
      }
      return updatedState
    case 'ZERO_PLAYER_TURN':
      updateCellForPlayer(updatedState,
          getCellIdForZeroPlayerMedium(updatedState.field))
      nextTurnRoutines(updatedState)
      if (checkAndSetWinner(updatedState)) {
        return updatedState
      }
      return updatedState
    case 'RESET_GAME':
      return INITIAL_STATE
    default:
      return updatedState
  }
}

const GameContextProvider = (props) => {
  const [gameState, dispatchGameAction] = useReducer(gameReducer, INITIAL_STATE,
      undefined)

  const onTurnHandler = fieldId => {
    console.log('ON_TURN: ' + fieldId)
    dispatchGameAction({type: 'ON_TURN', fieldId})
  }

  const onWinHandler = () => {
    console.log("Win!")
    dispatchGameAction({type: 'RESET_GAME'})
  }

  const onZeroPlayerTurnHandler = useCallback(() => {
    console.log("Zero started to think")
    setTimeout(() => {
      console.log("Zero makes move!")
      dispatchGameAction({type: 'ZERO_PLAYER_TURN'})
    }, 1000)
  }, [])

  const gameContext = {
    game: gameState,
    onTurn: onTurnHandler,
    onWin: onWinHandler,
    onZeroPlayerTurn: onZeroPlayerTurnHandler
  }

  return <GameContext.Provider value={gameContext}>
    {props.children}
  </GameContext.Provider>
}

export default GameContextProvider