import { useEffect, useState } from 'react'
import ParsCourses from './ParsCourses.jsx';
import Calendar from './Calendar.jsx';



export default function Asistencias() {
  
  /* selection of alumn (the most important) */
  const [alumnObjSel, setAlumnObjSel]=useState({id: 0, cursoId: 1});
  
  return(
    <main>
      <section className='pars-select-general-cont'>
          <div className='pars-select'>
            <ParsCourses setAlumnObjSel={setAlumnObjSel}/>
          </div>
              
      </section>
      {alumnObjSel.id!=0&&<Calendar alumnObjSel={alumnObjSel}/>
    }
    </main>
  )
}

