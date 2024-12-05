import { useState, useEffect} from "react";
import { sendClearReq } from "./accountMods";


export default  function AccountPage(){
    const cookieReq={
        method: "GET",
        credentials: "include",
    }
    let [username, setUsername]=useState();
    

    useEffect(()=>{
        fetch("/read-auth", cookieReq).then(r=>r.json()).then(decoded=>{
            const newData = decoded.data
            console.log("Decoded data token: ", newData);
            setUsername(newData.use);
        })
    }, [])
    let [logoutBut, setLogoutBut] = useState(true);
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
                    
                </div>
                
            </div>
            
            <div className="prog-options">
                
            </div>
    </div>
}