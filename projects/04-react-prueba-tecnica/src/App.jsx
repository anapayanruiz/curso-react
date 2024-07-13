import { useEffect, useState } from 'react'
import './App.css'


const CAT_URL_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_IMAGE_PREFIX_URL = 'https://cataas.com/cat/says/'

export function App() {
    const[fact, setFact] = useState('lorem ipsum cat fact')
    const[imageUrl, setImageUrl] = useState('')
    // const [factError, setFactError] = useState('')

    // para recuperar la cita al cargar la página
    useEffect(() => {
        fetch(CAT_URL_RANDOM_FACT)
            .then(response => {
                // TODO: handle error if response is not ok
                if(!response.ok) throw new Error('Response is not ok')
                return response.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)                     
            })
            .catch(error => {
                // tanto si hay error en la petición 
                // como si hay error en el json
                console.error('Error:', error)
            })
    }, [])

    // para recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        if(!fact) return

        const threeFirstWord = fact.split(' ', 3).join(' ')
        fetch(`${CAT_IMAGE_PREFIX_URL}${threeFirstWord}?size=50&color=red?json=true`)            
            .then(response => {
                if(!response.ok) throw new Error('Response is not ok')
                const { url } = response
                setImageUrl(url)
            })
            .catch(error => console.error('Error:', error))
    }, [])

    return (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>App de gatitos</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
            </section>
        </main>
    )
}