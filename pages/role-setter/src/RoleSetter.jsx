import { useState } from 'react'

export default function RoleSetter() {
  const [results, setResults] = useState([])
  const [menu, setMenu] = useState("searcher");
  return (
    <div className='role-setter-cont'>
        <div className='searcher-accounts'>
          <div className='search-input'>
            <input type ="search"/>
            <button className='search-button'>Buscar</button>
          </div>
          <div className='search-pars'>
            <div className='par-menu'>
                <div className='left-edge'>Cuentas</div>
                <div className='right-edge'>Peticiones</div>
            </div>
            <div className='par-courses'>

            </div>
            <div className='par-role'>

            </div>
          </div>
        </div>
        <div className='menu-results'>
          {
            
          }
        </div>
    </div>
  )
}
