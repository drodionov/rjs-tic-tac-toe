import classes from './Cell.module.css'

const Cell = ({value}) => {

  return (
      <div className={classes.cell}>
        {value}
      </div>
  )
}

export default Cell