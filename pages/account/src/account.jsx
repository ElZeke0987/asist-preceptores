import { useState } from "react";

export default  function AccountPage(){
    const cookieReq={
        method: "GET",
        credentials: "include",
    }
    let [username, setUsername]=useState();
    fetch("/read-auth", cookieReq).then(r=>r.json()).then(decoded=>{
        const newData = decoded.data
        console.log("Decoded data token: ", newData);
        setUsername(newData.use);
    })
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
            <div className="account-role">
                
            </div>
        </div>
            
        <div className="prog-options">
            
        </div>
    </div>
}