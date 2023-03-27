import ReactDOM from "react-dom"
import classes from './Modal.module.css'
import {useDispatch, useSelector} from "react-redux"
import {gameAction} from "../../store/game-actions"

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
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()
  let content
  if (game.winner === '-') {
    content = <p>It's SPARE</p>
  } else {
    content = game.winner === 'X' ? "You win!" : "You lose!"
  }

  const onCloseHandler = () => {
    dispatch(gameAction.resetGame())
  }

  return <>
    {ReactDOM.createPortal(<Backdrop onClose={onCloseHandler}/>,
        portalElement)}
    {ReactDOM.createPortal(
        <ModalOverlay><p>{content}</p></ModalOverlay>,
        portalElement)}
  < />
}

export default Modal