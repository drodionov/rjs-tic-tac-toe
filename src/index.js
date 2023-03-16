import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameField from './GameField'
import GameContextProvider from "./store/GameContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
      <GameContextProvider>
        <GameField/>
      </GameContextProvider>
    </React.StrictMode>
)
