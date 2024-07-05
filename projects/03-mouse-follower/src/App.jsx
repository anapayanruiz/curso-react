import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    
    console.log('effect', enabled);
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Clean up:
    // --> cuando el componente se desmonta
    // --> cuando cambian las dependencias, antes de ejecutar el efecto
    return () => { // clean up
      console.log('Clean up');
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] --> solo se ejecuta una vez cuando se monta el componente
  // [enabled] --> se ejecuta cuando se monta el componente y cada vez que cambia enabled
  // undefined --> se ejecuta cada vez que se renderiza el componente

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', !enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#89f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
    </>
  )
}


function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
