import React from 'react';
import ChessPiece from './ChessPiece'

export default function MapRow({row, rowIdx, clickPiece, currentPosition}){ 
    return (
      <tr key={`row_${rowIdx}`}>
        {row.map(
            (pieceName, columnIdx) => {
            const [ currentRow, currentColumn ] = currentPosition
            return(            
              <td 
                style={currentRow === rowIdx && currentColumn === columnIdx? { background: "radial-gradient(white,blue)"} : {}} 
                onClick={e => clickPiece([rowIdx,columnIdx])} 
                key={`column_${columnIdx}`} 
                className="chess-board_square">
                    <ChessPiece 
                        piece={pieceName}>
                    </ChessPiece>
              </td>)
            })}
      </tr>)
};