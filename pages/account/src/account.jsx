import { useState, useEffect} from "react";
import { sendClearReq } from "./accountMods";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";

const roleOpts=[
    {val: "alum", txt: "Alumno"}, 
    {val: "prec", txt: "Preceptor"}, 
    {val: "prof", txt: "Profesor"}
];
const grpsOpts=[
    {val: "a", txt: "Grupo A"},
    {val: "b", txt: "Grupo B"}
]
export default function AccountPage(){
    const cookieReq={
        method: "GET",
        credentials: "include",
    }
    let [username, setUsername]=useState();
    let [role, setRole]=useState();//Rol preestablecido de haber uno
    
    let [coursesList, setCoursesList]=useState();

    let [loadAuth, setLoadAuth]=useState(false)
    const coursesReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            turno: "all",
        })
    }
    useEffect(()=>{
        fetch("/read-auth", cookieReq).then(r=>r.json()).then(async decoded=>{
            const newData = decoded.data
            console.log("Decoded data token: ", newData);
            await setUsername(newData.use);
            await setRole({role: newData.rol, id: newData.idr});
            setLoadAuth(true);
        });
        fetch("/load-courses", coursesReq).then(r=>r.json()).then(data=>{
            console.log("couList: ",data.couList);
            setCoursesList(data.couList)
        });
    }, [])
    /* Manejadores de elementos */
    let [logoutBut, setLogoutBut] = useState(true);
    let [formRole, setFormRole] = useState(false);
    
    /* Datos del formulario */
    let [nom, setNom] =useState("");
    let [ape, setApe] = useState("");
    let [dni, setDni] = useState("");
    let [courseId, setCourseId] = useState(1);
    let [grp, setGrp] = useState("a");
    let [selRole, setSelRole]=useState({val: "alum", txt: "Alumno"});
    let [msgPet, setMsgPet]=useState();
    const sendPetReq={
        method: "POST", 
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nom,
            ape,
            dni,
            courseId,//Es un objeto de val y txt
            grp,
            selRole,
            msgPet,
        })
    }
    function sendPetition(){
        fetch("/set-petition", sendPetReq)
    }

    return <div>
            <div>
                <div className="account-pres">
                    <div className="account-icon">
                        <img/>
                    </div>
                    <div className="account-hello">
                        Bienvenido a tu cuenta <span className="account-name">{username}</span>
                    </div>
                </div>
                <div className="account-opts">
                    <div className="logout">
                        {logoutBut==true?
                        <div className="logout-but" onClick={()=>setLogoutBut(false)}>Cerrar sesion</div>
                        :
                        <div className="logout-conf">
                            <div className="logout-question">Seguro de cerrar sesion?</div>
                            <div className="logout-conf-buts">
                                <div className="logout-yes" onClick={()=>sendClearReq(setLogoutBut, "yes")}>Si</div>
                                <div className="logout-no"onClick={()=>sendClearReq(setLogoutBut, "no")}>No</div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="account-role">
                    {console.log("Testing values to request role: loadAuth", loadAuth, " role ",role, " formRole: ",formRole)}
                    {loadAuth&&(role.role=="visit"&&formRole==false) &&<button onClick={()=>setFormRole(true)}>Pedir rol</button>}
                    {formRole&&<div className="form-role">
                        <CustomSelect opts={roleOpts} onSelect={setSelRole} propVal="val" propTxt="txt" defaultText="Alumno" defaultValue="alum" overDefaults={true} clases={"form-role-select"}/>
                        <div>
                            <label>Nombre</label>
                            <input onChange={e=>setNom(e.target.value)}/>
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input onChange={e=>setApe(e.target.value)}/>
                        </div>
                        <div>
                            <label>Dni</label>
                            <input onChange={e=>setDni(e.target.value)}/>
                        </div>
                        {selRole?.val=="alum"&&<>
                                <CustomSelect opts={coursesList} onSelect={setCourseId} propVal={"id"} propTxt={"curso"} defaultText={"1ro1ra"||'Select Course'} defaultValue={courseId||1} overDefaults={true} clases="form-role-course-select" />
                                <CustomSelect opts={grpsOpts} onSelect={setGrp} propVal={"val"} defaultText={"Grupo "+grp.toUpperCase()||"Grupo A"||'Select Group'} clases="res-item-select" defaultValue={grp||"a"} overDefaults={true}/>
                            </>
                        }
                        <div>
                            <label>Deja un mensaje para la peticion</label>
                            <textarea onChange={e=>setMsgPet(e.target.value)}>

                            </textarea>
                        </div>
                        <button onClick={e=>sendPetition()}>Enviar peticion</button>
                    </div>}
                </div>
                
            </div>
            
            <div className="prog-options">
                
            </div>
    </div>
}