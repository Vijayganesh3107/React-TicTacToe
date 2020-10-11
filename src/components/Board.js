import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
    <div className="board">
        {squares.map((square,index)=>{
            return(
                <Square key={index} value={square} onClick={()=>onClick(index)}></Square>
            )
        })}
    </div>
);

export default Board;
