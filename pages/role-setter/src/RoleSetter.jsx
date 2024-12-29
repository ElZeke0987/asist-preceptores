import { useEffect, useRef, useState } from 'react'
import CustomSelect from '../../../src/comps/molecules/customSelect/customSelect.jsx';
import ResultUser from './resultsComp.jsx';
import ResultJust from './resultJust.jsx';

export default function RoleSetter() {
  let [results, setResults] = useState({resList: [], type: "account"})
  let [menu, setMenu] = useState("account");
  let [courses, setCourses] = useState([]);
  let [cOpt, setCOpt]=useState();
  let [linked, setLinked]=useState(false);
  const [coursePar, setCoursePar]=useState(false);
  const [alumnPar, setAlumnPar]=useState(false);
  const [finalAlumnList, setFinalAlumnList]=useState([])
  const [aOpt, setAOpt]=useState()
  //let [search, setSearch]=useState("");//Se usa en caso de usar el boton de Search

  const coursesReq={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        turno: "all"
    })
  }
  
  useEffect(()=>{
    if(menu=="justify"){//Filtrado de alumnos en el menu de justificaciones
      let newFinalAlumnList=[]
      
      results.alumnList.forEach((alumn)=>{
        if(alumn.curso_id==cOpt.id){
          newFinalAlumnList.push(alumn)
        }
      })
      setFinalAlumnList(newFinalAlumnList)
    }
  },[cOpt])

  useEffect(()=>{
    fetch("/load-courses", coursesReq).then(r=>r.json()).then(data=>{
      setCourses(data.couList)
    });
    handleSearch();
  }, [])

  
  async function parMenuHandleClick(e){
    console.log("to change menu test value: ", e.target.id)
    await setMenu(e.target.id);
    await handleSearch(e.target.id)
    
    
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
            type: menuVal ,
        })
      }
      
      fetch(`/load-to-set-${menuVal}`, SearchReq).then(r=> r.json()).then(data=>{//Carga peticiones o cuentas
        setResults({resList: []})
        setMenu(menuVal);//Aun asi es usado mas tarde
        if(menuVal=="justify"){
          setResults({resList: data.resList, alumnList: data.alumnList, type: menuVal});
          return
        }
        setResults({resList: data.resList, type: menuVal});//Usado para reducir y controlar mejor los tiempos de carga
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
                <div className={`left-edge ${menu=="account"?"selected":""}`} id="account" onClick={e=>parMenuHandleClick(e)}>Cuentas</div>
                <div className={`center ${menu=="justify"?"selected":""}`} id="justify" onClick={e=>parMenuHandleClick(e)}>Justificaciones</div>
                <div className={`right-edge ${menu=="petitions"?"selected":""}`} id="petitions" onClick={e=>parMenuHandleClick(e)}>Peticiones</div>
                {console.log("finalM state: ", menu, " account class: ", menu=="account"?"selected":"", " petitions class: ", menu=="petitions"?"selected":"")}
            </div>
            <div className='par-courses'>
                <CustomSelect opts={courses} onSelect={setCOpt} propVal={"id"} propTxt={"curso"} defaultText='Select Course' clases="par-select" />
                <div onClick={e=>setCoursePar(!coursePar)} className={`${coursePar?"selected":"unselected"}`}>{coursePar?"On":"Off"}</div>
                {menu=="justify"&&<>
                <CustomSelect opts={finalAlumnList} onSelect={setAOpt} propVal='id' propTxt='nom_comp' defaultText='Select alumn' clases="par-select"/>
                <div onClick={e=>setAlumnPar(!alumnPar)} className={`${alumnPar?"selected":"unselected"}`}>{alumnPar?"On":"Off"}</div>
                </>}
                
            </div>
            <div className='par-role'>

            </div>
            {menu=="account"&&<div className='par-linked'>
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
            </div>}
          </div>
        </div>
        <div className='menu-results'>
          {
            /* Peticiones:
              -Propiedades: en lo posible, muy similares a las de los objetos de alumnos y demas.
              -Revisar resultComps.jsx o el objeto ResultUser para ver que propiedades se usaran

            */
            results.resList.map((v, i)=>{
              //console.log("testing cOpt ", cOpt, " and testing v: ", v)
              
              
              if(coursePar&&!cOpt){return}//Si la opcion de coursePar esta activada (se filtran por los cursos) y no hay un curso definido, se pasa de largo
              if(coursePar&&v.curso_id!=cOpt.id){return}//No coinciden en curso seleccionado y curso del parametro: volver
              if(menu=="justify"){
                  console.log("testing menu val: ", menu)
                  if(alumnPar&&!aOpt){return}
                  console.log("Testing alumnPar: ", alumnPar, " aOpt: ", aOpt, " value of justAsist: ", v)
                  if(v.alumn_id!=aOpt?.id){return}
                  
                  return <ResultJust alumnItem={aOpt} justAsist={v} type={menu}/>
              }
              if(cOpt&&v&&menu!="justify"){
                if(v.rol!="alum"){//No es alumno: volver
                  return
                }
                
                
              }
              if(linked==false&&v.rol!="visit"&&results.type!="petitions"){//Aca se puede dar pie a mostrar un historial de peticiones
                return
              }
              return (
                <ResultUser alumnItem={v} key={i} courses={courses} itemId={v.id} type={results.type}/>
              )
            })


          }
        </div>
    </div>
  )
}
