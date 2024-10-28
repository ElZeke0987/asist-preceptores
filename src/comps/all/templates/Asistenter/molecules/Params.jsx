
import { requestToLoadAlumns, requestToPostInform, requestToLoadCourses} from './mods/Reqs.js';
import { ChangeTourn, SelGroupTaller} from './mods/EvListeners.js';
import { grpOpts, getTourn, searchTalSelGrp, checkAllFunc} from './mods/Mods.js';
import { useState, useEffect} from 'react';
import { handleStyleCheckTourn } from '../../../../styling.js';
import CustomSelect from '../../../molecules/customSelect/customSelect.jsx';
let modulosArr=[
    {val: "taller", txt: "Taller"},
    {val: "5to_mod", txt: "5to modulo"},
    {val: "aula", txt: "Aula"},
    {val: "edu_fis", txt: "Educacion fisica"}
]

requestToLoadCourses();

let devMode = false;

export default function Params({setAlumnsList, setAllPresence, allPresence, setAllJustified, allJustfied}){
    let [checked, setChecked] = useState();
    let [courses, setCourses] = useState(devMode?[{ val:"5to5ta", txt:"5to5ta"}, { val:"5to2da", txt:"5to2da(petes)"}]:[]);
   
    return (
        <div className='pars-cont'>
            <div className="general-params">
                <div className="tourn-params">
                    <div className="tourn-select">
                        <div className="in-tourn" onClick={(e)=>{handleStyleCheckTourn(e); ChangeTourn(e, setCourses)}}>
                            <input type="radio" id='morn' name="tourn" /*onChange={(e)=>ChangeTourn(e, setCourses)}*/ onLoad={getTourn} /> 
                            <label>
                                T.M.
                            </label>
                        </div>
                        <div className="in-tourn" onClick={(e)=>{handleStyleCheckTourn(e); ChangeTourn(e, setCourses)}}>
                            <input type="radio" id='afnoon' name="tourn" /*onChange={(e)=>ChangeTourn(e, setCourses)}*/ onLoad={getTourn} /> 
                            <label>
                                T.T.
                            </label>
                        </div>
                        <div className="in-tourn" onClick={(e)=>{handleStyleCheckTourn(e); ChangeTourn(e, setCourses)}}>
                            <input type="radio" id='night' name="tourn" /*onChange={(e)=>ChangeTourn(e, setCourses)}*/ onLoad={getTourn} /> 
                            <label>
                                T.V.
                            </label>
                        </div>
                    </div>
                    <CustomSelect clases="course-list" opts={courses} onChange={()=>grpOpts(setAlumnsList)} onSelect={(opt)=>requestToLoadAlumns(setAlumnsList)} propVal={"id"} propTxt={"curso"} defaultText='Select Course'/>
                    
                </div>
                <div className="modulo-sty">
                    <CustomSelect clases="modulo" opts={modulosArr} onChange={()=>grpOpts(setAlumnsList)} onSelect={requestToLoadAlumns(setAlumnsList)} defaultText='Select module'/>
                    
                    <div className="grupo-taller" style={{display: 'none'}}>
                        <div className="gro-opt" onClick={handleStyleCheckTourn}>
                            <label>Grupo A</label>
                            <input type="radio" id="a" name="group" onClick={(e)=>SelGroupTaller(e,setAlumnsList)}/>
                        </div>
                        <div className="gro-opt" onClick={handleStyleCheckTourn}>
                            <label>Grupo B</label>
                            <input type="radio" id="b" name="group" onClick={(e)=>SelGroupTaller(e,setAlumnsList)}/>
                        </div>
                        <div className="gro-opt" onClick={handleStyleCheckTourn}>
                            <label>Ambos</label>
                            <input type="radio" id="both" name="group" onClick={(e)=>SelGroupTaller(e,setAlumnsList)}/>
                        </div>
                        
                    </div>

                    
                    </div>
                    <div className="just-falta">
                        <div className="check-all just-opt checked-opt" onClick={()=>{handleStyleCheckTourn();setAllPresence(!allPresence)}} >
                            <label>Check all fields</label>
                            <input type="checkbox" defaultChecked={true} onChange={checkAllFunc}/>
                        </div>
                        <div className="prof-asist just-opt checked-opt" onClick={()=>{handleStyleCheckTourn();setAllJustified(!allJustified)}}>
                            <label>Asistio el profe?</label>
                            <input type="checkbox" defaultChecked={true}/>
                        </div>
                        <div className="just-asist just-opt" onClick={()=>{handleStyleCheckTourn();setAllJustified(!allJustified)}}>
                            <label>Falta justificada al curso entero</label>
                            <input type="checkbox"/>
                        </div>
                    </div>
            </div>
        </div>
    )
}