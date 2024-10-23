import { handleFocusInp } from "../../../../styling";

export default function Login(){

    return(
        <div className="init-cont-ex">
            <div className="init-cont-in">
                <div className="init-title">Iniciar sesion</div>
                <form className="init-form login">
                    <div className="init-inp-item">
                        <label>Username/email</label>
                        <input className="l-useroemail" placeholder="can only one of them" onFocus={handleFocusInp}/>
                    </div>
                        
                    <div className="init-inp-item">
                        <label>Password</label>
                        <input className="l-password" type="password" placeholder="Insert password" onFocus={handleFocusInp}/>
                    </div>
                    

                    
                </form>
                <div className="init-button">
                    <button className="l-button">Iniciar sesion</button>
                </div>
                    
            </div>
        </div>
    )
}