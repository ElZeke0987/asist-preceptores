import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '../../../src/comps/molecules/Nav/Nav.jsx'
import IndexPage from './ind.jsx'
console.log("index rendering");
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Nav/>
    <IndexPage/>
  </StrictMode>,
)
