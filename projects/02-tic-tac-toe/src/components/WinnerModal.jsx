import { Square } from './Square';

export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null

    const winnerText = winner === false ? 'Empate' : `Ganador: ${winner}`

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                { 
                    winner && (
                        <header className='win'>
                            <Square>{winner}</Square>
                        </header>
                    )
                }
                <footer>
                    <button onClick={resetGame}>
                        Reiniciar
                    </button>
                </footer>
            </div>
        </section>
    )
}