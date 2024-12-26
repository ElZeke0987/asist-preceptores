import { useEffect, useState } from "react"
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect"
import { alumnIdSelEff, courseIdSelEff, grpIdSelEff } from "./effects";

const grpList=[
  {txt: "Grupo A", grp: "a"},
  {txt: "Grupo B", grp: "b"},
]

export default function ParsCourses({setAlumnObjSel}){
    const [alumnsLoadCourse, setAlumnsLoadCourse]=useState([])
    const [alumnsLoadGrp, setAlumnsLoadGrp]=useState([]);

    const [courseOpen, setCourseOpen]=useState(false);
    const [alumnsOpen, setAlumnsOpen]=useState(false);
    const [grpOpen, setGrpOpen]=useState(false);

    const [alumnIdSel, setAlumnIdSel]=useState();
    const [courseIdSel, setCourseIdSel]=useState({curso: "1ro1ra", id: 1});
    const [grpSel, setGrpSel]=useState({txt: "Grupo A", grp:"a"});


    const loadCoursesReq={
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({turno: "all"})
      }      
      let [data, setData]=useState();
      let [loading, setLoading]=useState(true)
      async function fetchCourses () {
        const response = await fetch("/load-courses-asistencias", loadCoursesReq);
        const dataFetch = await response.json();
        await setData(dataFetch)
        await setCourseIdSel({id: dataFetch.courseList[0].id, curso: dataFetch.courseList[0].curso})
        
    };
      useEffect(()=>fetchCourses(),[])//Una vez montado el componente se prosigue con la carga de cursos que seria algo mas asincrono

      useEffect(()=>alumnIdSelEff(alumnsLoadGrp, setAlumnObjSel, alumnIdSel),[alumnIdSel])//La lista final es la de los grupos

      useEffect(()=>courseIdSelEff(data, courseIdSel, setAlumnsLoadCourse, alumnsLoadCourse),[courseIdSel])

      useEffect(()=>grpIdSelEff(grpSel||"all", alumnsLoadCourse, alumnsLoadGrp, setAlumnsLoadGrp), [grpSel]);

      

    if(data==undefined){
        return(
            <div>Loading courses and alumns...</div>
        )
    }
    else{
    return(
        <>
            <CustomSelect opts={data?.courseList} onSelect={setCourseIdSel} 
            defaultText={data?.courseList[0]?.curso||"1ro1ra"} defaultValue={data?.courseList[0]?.id||1} overDefaults={true} 
            propTxt='curso' propVal='id' clases={"pars-course"} 
            setIsOpenPar={setCourseOpen} isOpenPar={courseOpen}/>

            <CustomSelect opts={grpList} onSelect={setGrpSel} 
            defaultText={grpSel.txt} defaultValue={grpSel.grp} overDefaults={true}
            propTxt='txt' propVal='grp' clases={"pars-group"} 
            setIsOpenPar={setGrpOpen} isOpenPar={grpOpen}/>

            <CustomSelect opts={alumnsLoadCourse} onSelect={setAlumnIdSel} 
            defaultText={data?.alumnList[0].nom_comp!=''?data?.alumnList[0].nom_comp:data?.alumnList[0].apellido||"Seleccionar alumno"} 
            defaultValue={data?.alumnList[0].id||null} overDefaults={true}
            propTxt={'nom_comp'||'apellido'} propVal='id'  clases={"pars-alumn"} 
            setIsOpenPar={setAlumnsOpen} isOpenPar={alumnsOpen} />
        
        </>)
    }
}