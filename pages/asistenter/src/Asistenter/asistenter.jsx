import { useEffect, useState } from "react"
import Params from "./molecules/Params"
import { requestToPostInform } from "./mods/Reqs"
import AlumnItem from "./molecules/AlumnItem";

export default function AsistenterPage(){
    const [allPresence, setAllPresence]=useState(true);
    const [profAsist, setProfAsist] = useState(true);
    const [allJustified, setAllJustified]=useState(false);

    /* Informacion enviada en el informe mas tarde */
    const [alumnsList, setAlumnsList]=useState([]);
    const [modEsc, setModEsc]=useState({val: "aula"})
    const [courseSel, setCourseSel] = useState({id: 1, curso:"1ro1ra"});
    const [grpSel, setGrpSel] = useState("both");

    
    return(
        <div className="background-asist">
            <div className="asistenter-cont">
                <Params setAlumnsList={setAlumnsList} 
                setAllPresence={setAllPresence} allPresence={allPresence} 
                setAllJustified={setAllJustified} allJustified={allJustified}
                setProfAsist={setProfAsist} profAsist={profAsist}
                modEsc={modEsc} setModEsc={setModEsc}
                courseSel={courseSel} setCourseSel={setCourseSel}
                grpSel={grpSel} setGrpSel={setGrpSel}
                />
                
                <div className="searcher">
                    <input type="text" placeholder="Buscar alumno..."/>
                    <button className="submit-search">
                        {">"}
                    </button>
                </div>
                    
                    
                <div className="alumn-list">
                    <div className='list'>
                        {
                            (alumnsList&&alumnsList!=[])&&alumnsList.map((a, ind)=>{return(<AlumnItem 
                                almn={a} key={a.id} ind={ind}
                                setAllPresence={setAllPresence} allPresence={allPresence} 
                                setAllJustified={setAllJustified} allJustified={allJustified}
                                setAlumnsList={setAlumnsList} alumnsList={alumnsList}
                                profAsist={profAsist}/>)})
                        }
                        {alumnsList==[]&&<div>Cargando y filtrando alumnos</div>}
                    </div>
                    <div className="submit-presence">
                        <button onClick={e=>requestToPostInform(profAsist, modEsc.val, courseSel.id, grpSel, alumnsList, allJustified )}>
                            <div className="button-cont">
                                <div className="text-submit">Enviar informe</div>
                                <div className="point-down-animation">{">"}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
            
    )
}
