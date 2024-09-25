import { useState } from 'react';
import Nav from './all/molecules/Nav/Nav.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import IndexPage from './all/templates/Index/ind.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
            <Route path="/" element={<IndexPage/>}/>
        </Routes>
      </Router>  
      
    </>
  )
}

export default App
