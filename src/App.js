import classes from './App.module.css'
import Cells from "./components/Cell/Cells";

const App = () => {
  return (
      <main className={classes.root}>
        <header className={classes.header}>
          <h1>Welcome to yet another Tic-Tac-Toe Game!</h1>
        </header>
        <div className={classes.cells}><Cells/></div>
      </main>
  )
}

export default App
