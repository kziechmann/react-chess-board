import React from 'react';

const getIconPath = string =>{
    const abbreviation = {
       "K" : "king",
       "N" : "knight",
       "Q" : "queen",
       "B" : "bishop",
       "R" : "rook",
       "P" : "pawn"
    }
    let path = abbreviation[string[1]]
    path += string[0] === "W"? "_white" : "_black"
    return path 
}


export default function ChessPiece({ piece = "--" }){
    return piece === "--"? "" : <img src={require(`../images/${getIconPath(piece)}.svg`)} alt={getIconPath(piece)}/>
};