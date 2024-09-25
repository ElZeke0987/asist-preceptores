import { useState } from 'react';
import Nav from './all/molecules/Nav/Nav.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav></Nav>
    </>
  )
}

export default App
