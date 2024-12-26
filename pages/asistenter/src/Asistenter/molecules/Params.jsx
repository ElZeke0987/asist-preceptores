
const rootDir = "../../../../../";
const compsDir = rootDir+"src/comps/";
const molsDir = compsDir+"all/molecules/";

const stylingDir= `${compsDir}styling.js`;
console.log("sty", stylingDir);
const cusSelectDir = `${molsDir}customSelect/customSelect.jsx`;



import { requestToLoadAlumns} from '../mods/Reqs.js';
import { SelGroupTaller} from '../mods/EvListeners.js';
import { grpOpts, getTourn, searchTalSelGrp, checkAllFunc, filterAlumns} from '../mods/Mods.js';
import { useState, useEffect} from 'react';
import { handleStyleCheckTourn } from "../../../../../styling.js";
import CustomSelect from "../../../../../src/comps/molecules/customSelect/customSelect.jsx";
import MultiOpt from '../../../../../src/comps/molecules/MultiOpts/MultiOpts.jsx';

const modulosArr=[
    {val: "taller", txt: "Taller"},
    {val: "5to_mod", txt: "5to modulo"},
    {val: "aula", txt: "Aula"},
    {val: "edu_fis", txt: "Educacion fisica"}
]

export default function Params({setAlumnsList, setAllPresence, allPresence, setAllJustified, allJustfied, profAsist, setProfAsist}){
    let trn = tr ? tr : getTourn();
    console.log("trn: ", trn, "tr: ", tr);
    const [checked, setChecked] = useState();
    const [allData, setAllData]=useState();
    const [courses, setCourses] = useState();

    const [module, setModule] = useState();
    const [turno, setTurno] = useState(trn||"all");
    const [courseSel, setCourseSel] = useState();
    const [grpSel, setGrpSel] = useState("all");

    const [alumnsFinal, setAlumnsFinal] = useState();

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
        await setCourseSel({id: dataFetch.courseList[0].id, curso: dataFetch.courseList[0].curso})
    };

    useEffect(()=>fetchCourses(), []);

    useEffect(()=>fetchCourses(),[turno])

    useEffect(()=>filterAlumns(courseSel, data?.alumnList), [courseSel])

    useEffect(()=>filterAlumns(courseSel, data?.alumnList, ))

    

    return (
        <div className='pars-cont'>
            <div className="general-params">
                <div className="tourn-params">
                    <div className="tourn-select">
                        <MultiOpt actualValue={turno} shouldBe={"morn"} onClickHandle={e=>setTurno("morn")} typeInp="radio" nameInp="tourn" labelText="T.M." clases="in-tourn"/>
                        <MultiOpt actualValue={turno} shouldBe={"afnoon"} onClickHandle={e=>setTurno("afnoon")} typeInp="radio" nameInp="tourn" labelText="T.T." clases="in-tourn"/>
                        <MultiOpt actualValue={turno} shouldBe={"night"} onClickHandle={e=>setTurno("night")} typeInp="radio" nameInp="tourn" labelText="T.V." clases="in-tourn"/>
                    </div>
                    <CustomSelect clases="course-list" opts={data?.courseList} 
                    onSelect={(opt)=>{setCourseSel(opt); console.log("Select ", opt)}} 
                    propVal={"id"} propTxt={"curso"} 
                    defaultText='Select Course'/>
                    
                </div>
                <div className="modulo-sty">
                    <CustomSelect clases="modulo" opts={modulosArr} 
                    onSelect={setModule} 
                    defaultText='Select module'/>
                    
                    <div className="grupo-taller" style={{display: 'none'}}>
                        <div className={"gro-opt" + checkVal(grpSel, "a")}>
                            <label>Grupo A</label>
                            <input type="radio" name="group" onClick={(e)=>setGrpSel("a")} checked={grpSel=="a"}/>
                        </div>
                        <div className={"gro-opt" + checkVal(grpSel, "b")}>
                            <label>Grupo B</label>
                            <input type="radio" name="group" onClick={(e)=>setGrpSel("b")} checked={grpSel=="both"}/>
                        </div>
                        <div className={"gro-opt" + checkVal(grpSel, "both")}>
                            <label>Ambos</label>
                            <input type="radio" name="group" onClick={(e)=>setGrpSel("both")} checked={grpSel=="both"}/>
                        </div>
                        
                    </div>

                    
                    </div>
                    <div className="just-falta">
                        <div className={"check-all just-opt"+checkVal(allPresence, true)} onClick={()=>setAllPresence(!allPresence)} >
                            <label>Check all fields</label>
                            <input type="checkbox" checked={allPresence} onChange={checkAllFunc}/>
                        </div>
                        <div className={"check-all just-opt"+checkVal(profAsist, true)} onClick={()=>setProfAsist(!profAsist)}>
                            <label>Asistio el profe?</label>
                            <input type="checkbox" checked={profAsist}/>
                        </div>
                        <div className={"check-all just-opt"+checkVal(allJustfied, true)} onClick={()=>setAllJustified(!allJustified)}>
                            <label>Falta justificada al curso entero</label>
                            <input type="checkbox" checked={allJustfied}/>
                        </div>
                    </div>
            </div>
        </div>
    )
}