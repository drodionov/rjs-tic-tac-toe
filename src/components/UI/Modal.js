import ReactDOM from "react-dom";
import classes from './Modal.module.css'
import {useContext} from "react";
import GameContext from "../../store/game-context";

const Backdrop = ({onClose}) => {
  return <div className={classes.backdrop} onClick={onClose}/>
}

const portalElement = document.getElementById('overlays')

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div>{props.children}</div>
  </div>
}

const Modal = () => {
  const gameContext = useContext(GameContext)
  let content
  if (gameContext.game.winner === '-') {
    content = <p>It's SPARE</p>
  } else {
    content = <p>Congrats! We have a winner:
      Player {gameContext.game.winner}</p>
  }
  return <>
    {ReactDOM.createPortal(<Backdrop onClose={gameContext.onWin}/>,
        portalElement)}
    {ReactDOM.createPortal(
        <ModalOverlay>{content}</ModalOverlay>,
        portalElement)}
  < />
}

export default Modal