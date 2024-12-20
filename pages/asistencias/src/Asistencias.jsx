import { useEffect, useState } from 'react'
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect.jsx"
import { body } from 'express-validator';
import ParsCourses from './ParsCourses.jsx';
import Calendar from './Calendar.jsx';

const grpList=[
  {txt: "Grupo A", grp: "a"},
  {txt: "Grupo B", grp: "b"},
]

export default function Asistencias() {
  
  /* List de los items cargados */
  const [cursosList, setCursosList]=useState([]);
  const [alumnosList, setAlumnosList]=useState([]);
  const [listAsistencias, setListAsistencias]=useState([]);

  /* Items seleccionados en los customSelect's */
  
  const [grpSel, setGrpSel]=useState({txt: "Grupo A", grp:"a"});
  
  /* final selection and filtering vars */
  const [alumnsLoadCourse, setAlumnsLoadCourse]=useState([])
  const [alumnObjSel, setAlumnObjSel]=useState({id: 0});
  const loadCoursesReq={
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      turno: "all"
    })
  }

  
  useEffect(()=>{
    const loadAsistsReq={
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        alumn_id: alumnObjSel.id,
      })
    }
    fetch("/load-asistencias", loadAsistsReq).then(r=>r.json()).then(data=>{
      setListAsistencias(data.listAsistencias);
    })
  },[alumnObjSel])
  return(
    <main>
      <section className='pars-select'>
            <div>
              <ParsCourses setAlumnObjSel={setAlumnObjSel} alumnsLoadCourse={alumnsLoadCourse} setAlumnsLoadCourse={setAlumnsLoadCourse}/>

              <CustomSelect opts={grpList} onSelect={setGrpSel} 
              defaultText={grpSel.txt} defaultValue={grpSel.grp} overDefaults={true}
              propTxt='txt' propVal='grp' clases={"pars-group"} />
            </div>
      </section>
      {alumnObjSel.id!=0&&<Calendar alumnObjSel={alumnObjSel} listAsistencias={listAsistencias}/>
    }
    </main>
  )
}

