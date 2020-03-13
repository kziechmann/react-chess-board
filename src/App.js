import React, { useState } from 'react';
import BoardRow from './components/BoardRow';

import './App.css';

const initialBoard = [
  ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
  ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
  ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
]

function App() {
  const [state, updateState] = useState({
    board: initialBoard,
    currentPosition: [null,null],
    movingPiece: false
  })

  const movePiece = (currentPosition, nextPosition)=>{
    if(isValidMove(currentPosition,nextPosition)) {
      const [currentY,currentX] = currentPosition
      const [nextY,nextX] = nextPosition

      const newBoard = [...state.board]
      
      newBoard[nextY][nextX] = newBoard[currentY][currentX]
      newBoard[currentY][currentX] = "--"
      
      updateState({board:newBoard}) 
    }    
  }

  const isValidMove = (currentPosition, nextPosition) =>{
    const [currentY,currentX] = currentPosition
    const [nextY,nextX] = nextPosition
    const currentPiece = state.board[currentY][currentX]
    const nextPiece = state.board[nextY][nextX]
    if(currentY === nextY && currentX === nextX ) return false;
    if( currentPiece === "--") return false;
    if(currentPiece[0] === nextPiece[0]) return false;
    return true;
  }

  const clickPiece = (position) =>{
    const newState = {...state}
    if(!state.movingPiece){
      newState.movingPiece = true
      newState.currentPosition = position
    } else {
      newState.movingPiece = false
      newState.currentPosition = [null, null]
      movePiece(state.currentPosition, position)
    }
    updateState(newState)
  }

  return (
    <div className="App">
      <div className="chess-board" >
        <table className="chess-board_squares" cellSpacing="0">
          {state.board.map(
            (row, i) => < BoardRow row={row} rowIdx={i} clickPiece={clickPiece} currentPosition={state.currentPosition}/>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
