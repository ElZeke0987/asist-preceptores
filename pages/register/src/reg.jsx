import { useEffect, useRef, useState } from "react";
import { handleFocusInp } from "../../../styling"
import { errorsRender, errsEffect, handleXClick, regRequest} from "../../loremods";

export default function Register(){
    let [username, setUsername]=useState();
    let [email, setEmail]=useState();
    let [tel, setTel]=useState();
    let [pass, setPass]=useState();
    let [rPass, setRPass]=useState();
    let [err, setErr]=useState([]);
    const hasMounted = useRef(false)

    useEffect(()=>errsEffect(hasMounted, err, "reg"), [err]);
    
    return (
        <div className="init-cont-ex">
            <div className="init-cont-in reg">
                <div className="init-title">Registrarse</div>
                {
                    errorsRender(err, setErr)
                }
                <form className="init-form register">
                    <div className="init-inp-item">
                        <label>Username</label>
                        <input className="r-username" required placeholder="max 100 chars" onFocus={handleFocusInp} onChange={e=>setUsername(e.target.value)}/>
                    </div>
                        
                    <div className="init-inp-item">
                        <label>Email</label>
                        <input className="r-email"  type="email" onFocus={handleFocusInp} onChange={e=>setEmail(e.target.value)}/>
                    </div>

                    <div className="init-inp-item">
                        <label>Telefono</label>
                        <input className="r-tel"  type="tel"  onFocus={handleFocusInp} onChange={e=>setTel(e.target.value)}/>
                    </div>
                    
                    <div className="init-inp-item">
                        <label>Password</label>
                        <input className="r-password" required type="password" placeholder="Insert password" onFocus={handleFocusInp} onChange={e=>setPass(e.target.value)}/>
                    </div>

                    <div className="init-inp-item">
                        <label>Repeat password</label>
                        <input className="r-rep-password" type="password" placeholder="Repeat password" onFocus={handleFocusInp} onChange={e=>setRPass(e.target.value)}/>
                    </div>
                    
                    
                </form>
                <div className="init-button">
                    <button className="r-button" onClick={e=>regRequest(username, email, tel, pass, rPass, setErr)}>Registrarse</button>
                </div>
                
            </div>
                
        </div>
    )
}