import { useEffect, useRef, useState } from 'react'
import CustomSelect from '../../../src/comps/molecules/customSelect/customSelect.jsx';

export default function RoleSetter() {
  let [results, setResults] = useState([])
  let [menu, setMenu] = useState("searcher");
  let prevMenu = useRef(null);
  let [courses, setCourses] = useState([]);
  let [cOpt, setCOpt]=useState();
  let [linked, setLinked]=useState(false);
  fetch("/load-courses").then(r=>r.json()).then(data=>{
    console.log("couList: ",data.couList);
  });
  function handleSelect(opt){
    setCOpt(opt);
    
  }
  useEffect(()=>{

    if(prevMenu.current){  
      document.querySelector("#"+prevMenu.current).classList.remove("selected");
      document.querySelector("#"+menu).classList.add("selected"); 
    }
      
    prevMenu.current=menu;

  }, [menu])
  function parMenuHandleClick(e){
    setMenu(e.target.id);
  }

  function handleLinkedOpt(e, toBool){
      setLinked(toBool);
      //Agregar funciones para recargar la lista de cuentas
  }
  function handleOpen(){
    console.log("opening select");
    fetch("/load-courses").then(r=>r.json()).then(data=>{
      console.log("couList: ",data.couList);
    });
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
                <div className='left-edge selected' id="searcher" onClick={e=>parMenuHandleClick(e)}>Cuentas</div>
                <div className='right-edge' id="petitions" onClick={e=>parMenuHandleClick(e)}>Peticiones</div>
            </div>
            <div className='par-courses'>
                <CustomSelect opts={courses} onSelect={handleSelect} propVal={"id"} propTxt={"curso"} defaultText='Select Course' clases="par-select" onOpen={(e)=>handleOpen()}/>
            </div>
            <div className='par-role'>

            </div>
            <div className='par-linked'>
                <div className="linked-title">
                    Incluir vinculados
                </div>
                <div className="linked-opt">
                    {
                      linked==true&&<div className='linked-true' onClick={e=>handleLinkedOpt(e, false)}>
                        Si
                      </div>
                    }
                    {
                      linked==false&&<div className='linked-false' onClick={e=>handleLinkedOpt(e, true)}>
                        No
                      </div>
                    }
                </div>
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
