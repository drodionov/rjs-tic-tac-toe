import classes from './App.module.css'
import Cells from "./components/Cell/Cells";
import {useContext} from "react";
import GameContext from "./store/game-context";
import Modal from "./components/UI/Modal";

const GameField = () => {
  const gameContext = useContext(GameContext)
  let content
  if (gameContext.game.currentPlayer === 'X') {
    content = <h2>Your turn!</h2>
  } else {
    content = <h2>Opponent's turn!</h2>
  }
  return (
      <>
        {gameContext.game.winner && <Modal/>}
        <header className={classes.header}>
          <h1>Welcome to yet another Tic-Tac-Toe Game!</h1>
        </header>
        <main className={classes.root}>
          {content}
          <div className={classes.cells}><Cells/></div>
        </main>
      </>
  )
}

export default GameField
