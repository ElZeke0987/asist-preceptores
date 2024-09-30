import { useState } from 'react';
import Nav from './all/molecules/Nav/Nav.jsx';
import './vars.scss';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav/>
    </>
  )
}

export default App
