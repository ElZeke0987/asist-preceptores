import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../../../src/styles/index.scss";
import AsistenterPage from './Asistenter/asistenter.jsx'
import Nav from '../../../src/comps/molecules/Nav/Nav.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <AsistenterPage />
  </StrictMode>,
)