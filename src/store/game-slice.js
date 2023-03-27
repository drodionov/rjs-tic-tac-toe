import {createSlice} from "@reduxjs/toolkit"

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
  }, [])
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
    }
  }
}

const nextTurnRoutines = (updatedState) => {
  updatedState.turnCount++
  updatedState.currentPlayer = updatedState.currentPlayer === 'X' ? 'O'
      : 'X'
}

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    turn(state, action) {
      if (state.field[action.payload]) {
        return state
      }

      if (state.currentPlayer === 'X') {
        updateCellForPlayer(state, action.payload)
      } else {
        updateCellForPlayer(state, getCellIdForZeroPlayerMedium(state.field))
      }
      nextTurnRoutines(state)
      checkAndSetWinner(state)
    },
    resetGame() {
      return {...INITIAL_STATE}
    }
  }
})

export default gameSlice