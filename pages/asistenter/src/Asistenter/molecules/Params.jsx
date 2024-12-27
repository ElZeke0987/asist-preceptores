
const rootDir = "../../../../../";
const compsDir = rootDir+"src/comps/";
const molsDir = compsDir+"all/molecules/";

const stylingDir= `${compsDir}styling.js`;
console.log("sty", stylingDir);
const cusSelectDir = `${molsDir}customSelect/customSelect.jsx`;

import { getTourn, filterAlumns, filterCourses} from '../mods/Mods.js';
import { useState, useEffect} from 'react';
import CustomSelect from "../../../../../src/comps/molecules/customSelect/customSelect.jsx";
import MultiOpt from '../../../../../src/comps/molecules/MultiOpts/MultiOpts.jsx';


const modulosArr=[
    {val: "taller", txt: "Taller"},
    {val: "5to_mod", txt: "5to modulo"},
    {val: "aula", txt: "Aula"},
    {val: "edu_fis", txt: "Educacion fisica"}
]

export default function Params({
    setAlumnsList, 
    setAllPresence, allPresence, 
    setAllJustified, allJustfied, 
    profAsist, setProfAsist, 
    modEsc, setModEsc,
    courseSel, setCourseSel,
    grpSel, setGrpSel}){
    const [allData, setAllData]=useState();
    const [courses, setCourses] = useState([]);
    const [turno, setTurno] = useState(getTourn()||"all");
    

    const [alumnsFinal, setAlumnsFinal] = useState([]);
    const loadCoursesReq={
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({turno})
    }
    async function fetchCourses () {
        const response = await fetch("/load-courses-asistencias", loadCoursesReq);
        const dataFetch = await response.json();
        await setAllData(dataFetch)
        console.log("data returned: ", dataFetch)
        await setCourses(dataFetch.courseList)
        await setCourseSel({id: dataFetch.courseList[0].id, curso: dataFetch.courseList[0].curso})
    };
    useEffect(()=>fetchCourses(), []);

    useEffect(()=>{if(allData)filterCourses(allData?.courseList, setCourses, turno)},[turno])

    useEffect(()=>{if(allData)filterAlumns(courseSel, allData?.alumnList, setAlumnsFinal, alumnsFinal, grpSel)}, [courseSel, grpSel])

    useEffect(()=>setAlumnsList(alumnsFinal),[alumnsFinal])

    useEffect(()=>console.log("new module: ", modEsc.val), [modEsc])

    return (
        <div className='pars-cont'>
            <div className="general-params">
                <div className="tourn-params">
                    <div className="tourn-select">
                        <MultiOpt actualValue={turno} shouldBe={"morn"} onClickHandle={e=>setTurno("morn")} typeInp="radio" nameInp="tourn" labelText="T.M." clases="in-tourn"/>
                        <MultiOpt actualValue={turno} shouldBe={"afnoon"} onClickHandle={e=>setTurno("afnoon")} typeInp="radio" nameInp="tourn" labelText="T.T." clases="in-tourn"/>
                        <MultiOpt actualValue={turno} shouldBe={"night"} onClickHandle={e=>setTurno("night")} typeInp="radio" nameInp="tourn" labelText="T.V." clases="in-tourn"/>
                    </div>
                    {(allData&&courses!=[])&&<CustomSelect clases="course-list" opts={courses} 
                    onSelect={(opt)=>{setCourseSel(opt); console.log("Select ", opt)}} 
                    propVal={"id"} propTxt={"curso"} 
                    defaultText={courseSel.curso} defaultValue={courseSel.id} overDefaults={true}/>}
                    {!allData&&<div>Cargando cursos</div>}
                    
                </div>
                <div className="modulo-sty">
                    <CustomSelect clases="modulo" opts={modulosArr} 
                    onSelect={setModEsc} 
                    defaultText='Select module'/>
                    
                    {modEsc.val=="taller"&&<div className="grupo-taller">
                        <MultiOpt actualValue={grpSel} shouldBe={"a"} onClickHandle={e=>setGrpSel("a")} typeInp="radio" nameInp="group" labelText="Grupo A" clases="gro-opt"/>
                        <MultiOpt actualValue={grpSel} shouldBe={"b"} onClickHandle={e=>setGrpSel("b")} typeInp="radio" nameInp="group" labelText="Grupo B" clases="gro-opt"/>
                        <MultiOpt actualValue={grpSel} shouldBe={"both"} onClickHandle={e=>setGrpSel("both")} typeInp="radio" nameInp="group" labelText="Ambos" clases="gro-opt"/>
                    </div>}
                    
                    </div>
                    <div className="just-falta">
                        <MultiOpt actualValue={allPresence} onClickHandle={e=>setAllPresence(!allPresence)} typeInp="checkbox" labelText="Check all fileds" clases="check-all just-opt"/>
                        <MultiOpt actualValue={profAsist} onClickHandle={e=>setProfAsist(!profAsist)} typeInp="checkbox" labelText="Asistio el profesor" clases="check-all just-opt"/>
                        <MultiOpt actualValue={allJustfied} onClickHandle={e=>setAllJustified(!allJustfied)} typeInp="checkbox" labelText="Justificar falta a todos" clases="check-all just-opt"/>
                    </div>
            </div>
        </div>
    )
}