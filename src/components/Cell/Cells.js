import Cell from "./Cell";
import classes from './Cells.module.css'
import {useContext, useEffect} from "react";
import GameContext from "../../store/game-context";

const Cells = () => {
  const gameContext = useContext(GameContext)

  const onClickHandler = (idx) => {
    if (gameContext.game.currentPlayer === 'O') {
      return
    }
    gameContext.onTurn(idx)
  }

  useEffect(() => {
    if (gameContext.game.currentPlayer === 'O') {
      gameContext.onZeroPlayerTurn()
    }
  }, [gameContext])

  const formattedCells = gameContext.game.field.map(
      (value, idx) => <div className={classes.cell} key={idx}
                           onClick={onClickHandler.bind(null, idx)}><Cell
          value={value}
      />
      </div>)

  return <div className={classes.cells}>
    {formattedCells}
  </div>
}

export default Cells