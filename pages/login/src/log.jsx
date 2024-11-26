import { useState } from "react";
import { handleFocusInp } from "../../../styling";
import { logRequest } from "./mods";

export default function Login(){
    let [userOEmail, setUserOEmail]=useState();
    let [password, setPassword]=useState();
    return(
        <div className="init-cont-ex">
            <div className="init-cont-in">
                <div className="init-title">Iniciar sesion</div>
                <form className="init-form login">
                    <div className="init-inp-item">
                        <label>Username/email</label>
                        <input className="l-useroemail" placeholder="can only one of them" onFocus={handleFocusInp} onChange={e=>setUserOEmail(e.target.value)}/>
                    </div>
                        
                    <div className="init-inp-item">
                        <label>Password</label>
                        <input className="l-password" type="password" placeholder="Insert password" onFocus={handleFocusInp} onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    

                    
                </form>
                <div className="init-button">
                    <button className="l-button" onClick={e=>logRequest(userOEmail, password)}>Iniciar sesion</button>
                </div>
                    
            </div>
        </div>
    )
}