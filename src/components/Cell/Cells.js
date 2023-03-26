import Cell from "./Cell";
import classes from './Cells.module.css'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {gameAction} from "../../store";

const Cells = () => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  const onClickHandler = (idx) => {
    if (game.currentPlayer === 'O') {
      return
    }
    dispatch(gameAction.turn(idx))
  }

  useEffect(() => {
    if (game.currentPlayer === 'O' && game.winner === undefined) {
      setTimeout(() => {
        console.log("Zero makes move!")
        dispatch(gameAction.turn())
      }, 1000)

    }
  }, [game, dispatch])

  const formattedCells = game.field.map(
      (value, idx) => <div className={classes.cell} key={idx}
                           onClick={onClickHandler.bind(null, idx)}>
        <Cell value={value}
        />
      </div>)

  return <div className={classes.cells}>
    {formattedCells}
  </div>
}

export default Cells