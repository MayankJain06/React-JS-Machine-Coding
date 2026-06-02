import { useState } from 'react'
import './App.css'
import useTictactoe from './hooks/tic-tac-toe';

const initialBoard = ()=> Array(9).fill(null);

function App() {
  
const {board, handleClick, calculateWinner, getStatusMessage, resetGame} = useTictactoe();

  return (
  <>
  <div className="game">
    <div className="status">
      {getStatusMessage()}
      <button className='reset-button' onClick={resetGame}>Reset</button>
    </div>

    <div className="board">
      {board.map((b,index)=>{
        return (
          <button className="cell" key={index} onClick={()=>handleClick(index)} disabled={b !==null}>{b}</button>
        )
      })}
    </div>
  </div>
  </>
  )
}

export default App
