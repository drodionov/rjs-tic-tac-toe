import {configureStore} from '@reduxjs/toolkit'
import gameSlice from "./game-slice";

export const gameAction = gameSlice.actions

const store = configureStore({
  reducer: {game: gameSlice.reducer}
})

export default store

