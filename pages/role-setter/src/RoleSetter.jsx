import { useEffect, useRef, useState } from 'react'
import CustomSelect from '../../../src/comps/molecules/customSelect/customSelect.jsx';
import ResultUser from './resultsComp.jsx';

export default function RoleSetter() {
  let [results, setResults] = useState([])
  let [menu, setMenu] = useState("account");
  let prevMenu = useRef(null);
  let [courses, setCourses] = useState([]);
  let [cOpt, setCOpt]=useState();
  let [linked, setLinked]=useState(false);
  //let [search, setSearch]=useState("");//Se usa en caso de usar el boton de Search

  const coursesReq={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        turno: "all"
    })
  }
  
  function handleSelect(opt){
    setCOpt(opt);
  }
  useEffect(()=>{
    fetch("/load-courses", coursesReq).then(r=>r.json()).then(data=>{
      console.log("couList: ",data.couList);
      setCourses(data.couList)
    });
    handleSearch();
  }, [])
  useEffect(()=>{

    if(prevMenu.current){  
      document.querySelector("#"+prevMenu.current).classList.remove("selected");
      document.querySelector("#"+menu).classList.add("selected"); 
    }
      
    prevMenu.current=menu;
    
  }, [menu])
  async function parMenuHandleClick(e){
    await setMenu(e.target.id);
    console.log("menu: ", menu, " e.target.id: ", e.target.id);
    handleSearch(e.target.id)
  }

  function handleLinkedOpt(e, toBool){
      setLinked(toBool);
      //Agregar funciones para recargar la lista de cuentas
  }
  
  function handleSearch(menuVal=menu){
      let SearchReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            //search: inpVal,//parametro inpVal
            type: menuVal,
        })
      }
      fetch("/load-to-set-roles", SearchReq).then(r=> r.json()).then(data=>{
        console.log("Petitions or Accounts: ", data.resList)
        setResults(data.resList);
      })
  }
  return (
    <div className='role-setter-cont'>
        <div className='searcher-accounts'>
          <div className='search-input'>
            <input type ="search" />
            {/* <button className='search-button' onClick={()=>handleSearch()}>Buscar</button> */}
          </div>
          <div className='search-pars'>
            <div className='par-menu'>
                <div className='left-edge selected' id="account" onClick={async e=>await parMenuHandleClick(e)}>Cuentas</div>
                <div className='right-edge' id="petitions" onClick={async e=>await parMenuHandleClick(e)}>Peticiones</div>
            </div>
            <div className='par-courses'>
                <CustomSelect opts={courses} onSelect={handleSelect} propVal={"id"} propTxt={"curso"} defaultText='Select Course' clases="par-select" />
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
            results.map((v, i)=>{
              return (
                <ResultUser alumnItem={v} key={i} />
              )
            })
          }
        </div>
    </div>
  )
}
