import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameField from './GameField'
import {Provider} from "react-redux"
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <GameField/>
      </Provider>
    </React.StrictMode>
)
