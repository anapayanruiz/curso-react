import confetti from 'canvas-confetti';
import { useState } from 'react';
import './App.css';

import { Square } from './components/Square.jsx';
import { WinnerModal } from './components/WinnerModal.jsx';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './logic/board.js';
import { saveGameToStorage, resetGameFromStorage } from './logic/localStorage/index.js';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameFromStorage()
  }

  const updateBoard = (index) => {
    // no actualizar si ya hay un valor o 
    // si ya hay un ganador
    if (board[index] || winner) return
    
    /*
    spread y rest operator
    para hacer una copia superficial se usa spread operator
    para hacer una copia profunda se usa structured cloning
    hay que hacer una copia para no mutar el estado    
    */
    
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard) // asincrona
    
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar aqui partida
    saveGameToStorage({ board: newBoard, turn: newTurn })
    
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti();
      setWinner(newWinner) // asincrona
    }
    // revisar si el tablero esta lleno
    else if(checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
