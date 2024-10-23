import { handleFocusInp } from "../../../../styling"



export default function Register(){
    return (
        <div className="init-cont-ex">
            <div className="init-cont-in">
                <div className="init-title">Registrarse</div>
                <form className="init-form register">
                    <div className="init-inp-item">
                        <label>Username</label>
                        <input className="r-username" required placeholder="max 100 chars" onFocus={handleFocusInp}/>
                    </div>
                        
                    <div className="init-inp-item">
                        <label>Email</label>
                        <input className="r-email"  type="email" required onFocus={handleFocusInp}/>
                    </div>

                    <div className="init-inp-item">
                        <label>Telefono</label>
                        <input className="r-tel"  type="tel" required onFocus={handleFocusInp}/>
                    </div>
                    
                    <div className="init-inp-item">
                        <label>Password</label>
                        <input className="r-password" required type="password" placeholder="Insert password" onFocus={handleFocusInp}/>
                    </div>

                    <div className="init-inp-item">
                        <label>Repeat password</label>
                        <input className="r-rep-password" type="password" placeholder="Repeat password" onFocus={handleFocusInp}/>
                    </div>
                    
                    
                </form>
                <div className="init-button">
                    <button className="r-button">Registrarse</button>
                </div>
                
            </div>
                
        </div>
    )
}