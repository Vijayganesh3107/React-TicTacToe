import React, { Fragment, useState,useEffect } from "react";
import Board from "./Board";

 function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

const Game = () => {
  const [boardSquares, setBoardSquares] = useState( /* localStorage.getItem("isboardfilled")?[localStorage.getItem("isboardfilled")]: */[Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xNext, setXNext] = useState(true);
  const winner = calculateWinner(boardSquares[stepNumber]);
  const xO = xNext ? "X" : "O";

//   useEffect(()=>{
//       localStorage.setItem("isboardfilled",boardSquares);
//   },[boardSquares])

  const handleClick = (i) => {
    const historyPoint = boardSquares.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
   
    if (winner || squares[i]) return;
    
    squares[i] = xO;
    setBoardSquares([...historyPoint, squares]);
    setStepNumber(/* historyPoint.length */ stepNumber+1);
    setXNext(!xNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXNext(step % 2 === 0?true:false);
  };

  const trackMoves = () =>
    boardSquares.map((_step, index) => {
      const destination = index ? `Go to move #${index}` : "Reset";
      return (
        <li key={index}>
          <button onClick={() => jumpTo(index)}>{destination}</button>
        </li>
      );
    });

    const style=winner?`winner blink_me`:``;
  return (
    <Fragment>
      <h1>Tic Tac Toe</h1>
      <Board squares={boardSquares[stepNumber]} onClick={handleClick} />
      <div className="wrapper">
        <div>
          <h3>Progress</h3>
          {trackMoves()}
        </div>
        <h3 className={style}>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
      </div>
    </Fragment>
  );
};

export default Game;
