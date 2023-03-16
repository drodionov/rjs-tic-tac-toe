import Cell from "./Cell";
import classes from './Cells.module.css'
import {useState} from "react";

const Cells = () => {
  const [cells, setCells] = useState(['X', '', 'O', '', '', '', '', '', 'X'])

  const onClickHandler = (idx) => {
    setCells(prevState => {
      return prevState.map((value, i) => {
        if (i === idx) {
          return 'X';
        } else {
          return value;
        }
      });
    })
  }

  const formattedCells = cells.map(
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