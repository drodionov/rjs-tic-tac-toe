import classes from './App.module.css'
import Cells from "./components/Cell/Cells";
import {useContext} from "react";
import GameContext from "./store/game-context";
import Modal from "./components/UI/Modal";

const GameField = () => {
  const gameContext = useContext(GameContext)
  return (
      <>
        {gameContext.game.winner && <Modal/>}
        <header className={classes.header}>
          <h1>Welcome to yet another Tic-Tac-Toe Game!</h1>
        </header>
        <main className={classes.root}>
          <h2>Turn: {gameContext.game.turnCount}.
            Player: {gameContext.game.currentPlayer}.</h2>
          <div className={classes.cells}><Cells/></div>
        </main>
      </>
  )
}

export default GameField
