import { useEffect, useState } from "react"
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect"
import { alumnIdSelEff, courseIdSelEff, grpIdSelEff } from "./effects";

const grpList=[
  {txt: "Grupo A", grp: "a"},
  {txt: "Grupo B", grp: "b"},
]

const loadCoursesReq={
    method: "POST",
    credentials: "include",
}

export default function ParsCourses({setAlumnObjSel}){
    const [alumnsLoadCourse, setAlumnsLoadCourse]=useState([])
    const [alumnsLoadGrp, setAlumnsLoadGrp]=useState([]);
    const [alumnsLoadFinal, setAlumnsLoadFinal]=useState([])

    const [courseOpen, setCourseOpen]=useState(false);
    const [alumnsOpen, setAlumnsOpen]=useState(false);
    const [grpOpen, setGrpOpen]=useState(false);

    const [alumnIdSel, setAlumnIdSel]=useState();
    const [courseIdSel, setCourseIdSel]=useState({curso: "1ro1ra", id: 1});
    const [grpSel, setGrpSel]=useState({txt: "Todos", grp: "all"});
        
    let [data, setData]=useState();
    let [loading, setLoading]=useState(true)
    async function fetchCourses () {
      const response = await fetch("/load-courses-asistencias", loadCoursesReq);
      const dataFetch = await response.json();
      await setData(dataFetch)
      await setCourseIdSel({id: dataFetch.courseList[0].id, curso: dataFetch.courseList[0].curso})
        
    };
    useEffect(()=>fetchCourses(),[])//Una vez montado el componente se prosigue con la carga de cursos que seria algo mas asincrono

    useEffect(()=>alumnIdSelEff(alumnsLoadFinal, setAlumnObjSel, alumnIdSel),[alumnIdSel])//La lista final es la de los grupos

    useEffect(()=>courseIdSelEff(data, courseIdSel, setAlumnsLoadCourse, alumnsLoadCourse, setAlumnsLoadFinal),[courseIdSel])

    useEffect(()=>grpIdSelEff(grpSel?grpSel.grp:"all", alumnsLoadCourse, alumnsLoadGrp, setAlumnsLoadGrp, setAlumnsLoadFinal), [grpSel]);

    useEffect(()=>setAlumnsLoadFinal(alumnsLoadCourse),[alumnsLoadCourse])

    useEffect(()=>setAlumnsLoadFinal(alumnsLoadGrp),[alumnsLoadGrp])

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
            defaultText={"Todos"} defaultValue={"all"} overDefaults={true}
            propTxt='txt' propVal='grp' clases={"pars-group"} 
            setIsOpenPar={setGrpOpen} isOpenPar={grpOpen}/>

            <CustomSelect opts={alumnsLoadFinal} onSelect={setAlumnIdSel} 
            defaultText={"Seleccionar alumno"} 
            defaultValue={null} overDefaults={true}
            propTxt={'nom_comp'||'apellido'} propVal='id'  clases={"pars-alumn"} 
            setIsOpenPar={setAlumnsOpen} isOpenPar={alumnsOpen} />
        
        </>)
    }
}