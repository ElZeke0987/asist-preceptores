import { useState, useEffect} from "react";
import { sendClearReq } from "./accountMods";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
import "../../../src/styles/index.scss";

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
    const [petiId, setPetiId]=useState();
    /* Manejadores de elementos */
    const [logoutBut, setLogoutBut] = useState(true);
    const [formRole, setFormRole] = useState(false);
    const [petitionVer, setPetitionVer] = useState(true);

    /* Manejo de errores */
    let [errorInp, setErrorInp]=useState();
    useEffect(()=>{
        if(errorInp){
            setTimeout(()=>setErrorInp(undefined), 5000);
        }
    }, [errorInp])

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
    const verPetReq={
        method: "GET", 
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    }
    const cancelPetReq={
        method: "POST",
        credentials: "include",
        headers: {"COntent-Type": "application/json"},
        body: JSON.stringify({
            petiId
        }),
    }
    useEffect(()=>{
        fetch("/verify-petition", verPetReq).then(r=>r.json()).then(data=>{
            if(data.code==2){
                setPetitionVer(false);
                return
            }
            setPetitionVer(true);
        })
    },[])
    
    function sendPetition(){
        fetch("/set-petition", sendPetReq).then((res)=>res.json()).then(data=>{
            console.log("setted succesfuly the petition: ", data)
            if(data.code!=3){
                setErrorInp(data.msg);
                return
            }
            setPetiId(data.petiId)
            setFormRole(false);

        })
    }
    function cancelPetition(){
        fetch("/del-petition", cancelPetReq).then(r=>r.json()).then(data=>{
            setPetitionVer(true);
        })
    }
    return <div>
            <div>
                <div className="account-pres">
                    <div className="account-icon">
                        <img src="" alt="foto de perfil"/>
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
                    {petitionVer==false&&
                    <div className="set-petition petition-made">
                        <div>Peticion ya hecha, espera a que te la acepten</div>
                        <button onClick={e=>cancelPetition()}>Cancelar</button>
                    </div>}
                    {loadAuth&&petitionVer&&(role.role=="visit"&&formRole==false) &&<button onClick={()=>setFormRole(true)} className="set-petition">Pedir rol</button>}
                    {formRole&&petitionVer&&<div className="form-role">
                        {errorInp!=undefined&&<div className="result-error">{errorInp}</div>}
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
                                <CustomSelect opts={grpsOpts} onSelect={setGrp} propVal={"val"} defaultText={"Grupo "+grp=="a"?"A":"B"||"Grupo A"||'Select Group'} clases="res-item-select" defaultValue={grp||"a"} overDefaults={true}/>
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