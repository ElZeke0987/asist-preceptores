import { useState } from 'react';
import Nav from './molecules/Nav/Nav.jsx';
//import './index.scss';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav/>
    </>
  )
}

export default App
