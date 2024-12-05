import { useState, useEffect, useRef } from "react";
import { handleFocusInp } from "../../../styling";
import { errorsRender, errsEffect, handleXClick ,logRequest } from "../../loremods";

export default function Login(){
    let [userOEmail, setUserOEmail]=useState();
    let [password, setPassword]=useState();
    let [err, setErr]=useState();
    const hasMounted = useRef(false);

    useEffect(()=>errsEffect(hasMounted, err, "log"), [err]);
    return(
        <div className="init-cont-ex">
            <div className="init-cont-in log">
                <div className="init-title">Iniciar sesion</div>
                {
                    errorsRender(err, setErr)
                }
                <form className="init-form login">
                    <div className="init-inp-item">
                        <label>Username/email</label>
                        <input className="l-useroemail" placeholder="can only one of them" onLoad={e=>setUserOEmail(e.target.email)} onFocus={handleFocusInp} onChange={e=>setUserOEmail(e.target.value)}/>
                    </div>
                        
                    <div className="init-inp-item">
                        <label>Password</label>
                        <input className="l-password" type="password" placeholder="Insert password" onLoad={e=>setPassword(e.target.email)} onFocus={handleFocusInp} onChange={e=>setPassword(e.target.value)}/>
                    </div>
                </form>
                <div className="init-button">
                    <button className="l-button" onClick={e=>logRequest(userOEmail, password, setErr)}>Iniciar sesion</button>
                </div>
            </div>
        </div>
    )
}