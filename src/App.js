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
    turn: "black",
    currentPosition: [null,null],
    movingPiece: false
  })

  const movePiece = (currentPosition, nextPosition)=>{
    if(isValidMove(currentPosition, nextPosition)) {
      const [currentY,currentX] = currentPosition
      const [nextY,nextX] = nextPosition

      const newBoard = [...state.board]
      const turn = state.turn === 'black' ? 'white' : 'black'
      newBoard[nextY][nextX] = newBoard[currentY][currentX]
      newBoard[currentY][currentX] = "--"
      return { board:newBoard, turn }
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
    if(currentPiece[0].toLowerCase() !== state.turn[0].toLowerCase()) return false;
    return true;
  }

  const clickPiece = (position) =>{
    let newState = {...state};
    if(!state.movingPiece){
      newState.movingPiece = true
      newState.currentPosition = position
    } else {
      newState.movingPiece = false
      newState.currentPosition = [null, null]
      newState = {...newState, ...movePiece(state.currentPosition, position)}
    }
    updateState(newState)
  }

  return (
    <div className="App">
      <span className="app-header">
       <h1>React Chess</h1>
        <h2 style={{color: state.turn}}>{`{ ${state.turn}'s turn }`} </h2>
      </span>
      <div className="chess-board" >
        <table className="chess-board_squares" cellSpacing="0">
          {state.board.map(
            (row, i) => < BoardRow key={i} row={row} rowIdx={i} clickPiece={clickPiece} currentPosition={state.currentPosition}/>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
