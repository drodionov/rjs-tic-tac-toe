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
    <div className={classes.content}>{props.children}</div>
  </div>
}

const Modal = ({onClose}) => {
  const gameContext = useContext(GameContext)

  return <>
    {ReactDOM.createPortal(<Backdrop onClose={onClose}/>, portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>Congrats! We have a winner:
          Player {gameContext.game.winner}</ModalOverlay>,
        portalElement)}
  < />
}

export default Modal