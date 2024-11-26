import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../../../src/styles/index.scss";
import Nav from '../../../src/comps/molecules/Nav/Nav.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
  </StrictMode>,
)
