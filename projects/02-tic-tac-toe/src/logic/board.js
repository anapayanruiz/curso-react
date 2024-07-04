import { WINNER_COMBINATIONS } from '../constants'

export function checkWinner (boardToCheck) {
    //revisar todas las combinaciones ganadoras
    for(const combination of WINNER_COMBINATIONS) {
      const [a, b, c] = combination
      if (boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // revisar si hay empate
    return null
}

export function checkEndGame (boardToCheck) {
    //revisar si el tablero esta lleno
    return boardToCheck.every(square => square !== null)
}