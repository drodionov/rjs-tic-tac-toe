import classes from './App.module.css'
import Cells from "./components/Cell/Cells"
import Modal from "./components/UI/Modal"
import {useSelector} from "react-redux"

const GameField = () => {
  const game = useSelector(state => state.game)

  let content
  if (game.currentPlayer === 'X') {
    content = <h2>Your turn!</h2>
  } else {
    content = <h2>Opponent's turn!</h2>
  }
  return (
      <>
        {game.winner && <Modal/>}
        <header className={classes.header}>
          <h1>Welcome to yet another Tic-Tac-Toe Game [ReactJS & Redux]!</h1>
        </header>
        <main className={classes.root}>
          {content}
          <div className={classes.cells}><Cells/></div>
        </main>
      </>
  )
}

export default GameField
