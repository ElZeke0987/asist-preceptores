import { useState } from 'react'
import CustomSelect from '../../../src/comps/molecules/customSelect/customSelect.jsx';

export default function RoleSetter() {
  let [results, setResults] = useState([])
  let [menu, setMenu] = useState("searcher");
  let [courses, setCourses] = useState([]);
  let [cOpts, setCOpt]=useState();
  fetch("/load-courses").then(r=>r.json()).then(data=>{
    console.log(data.couList);
  });
  function handleSelect(opt){
    setCOpt(opt);
    
  }
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
                <CustomSelect opts={courses} onSelect={handleSelect} propVal={"id"} propTxt={"curso"} defaultText='Select Course'/>
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
