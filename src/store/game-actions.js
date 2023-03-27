import gameSlice from "./game-slice";

export const zeroTurn = () => {
  return (dispatch) => {
    setTimeout(() => {
      console.log("Zero makes move!")
      dispatch(gameAction.turn())
    }, 1000)
  }
}

export const gameAction = gameSlice.actions