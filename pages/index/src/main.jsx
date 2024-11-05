import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Nav from '../../../src/comps/molecules/Nav/Nav.jsx'
import IndexPage from './ind.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <IndexPage/>
  </StrictMode>,
)
