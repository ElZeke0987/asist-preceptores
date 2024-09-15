import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav class="nav-links">
        <a href="./account-init.html">Iniciar sesion / Registrarse</a>
        <a class="spc-prece" href="./asistenter.html">Tomar asistencia</a>
      </nav>
      Si ves esto es pq soy un componente react
    </>
  )
}

export default App
