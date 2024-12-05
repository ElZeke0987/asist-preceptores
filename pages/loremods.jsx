import { useState } from "react";
import ErrorMsg from "../src/comps/molecules/errorMsg";

export function logRequest(userOEmail, password){
    let logBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:   JSON.stringify({
            userOEmail,
            password
        })
    }
    fetch("/login-account", logBody).then(res=>res.json).then(data=>{
        if(data.errors){
            setErr(data.errors);
            console.log("Errors: ", data);
            return
        }
        console.log("data log: ", data);
        window.location.href="/account";
    })
}

export function regRequest(username, email, tel, pass, rPass, setErr, ind){
    if (!email&&!tel){
        setErr(["Necesitamos al menos un email o telefono"]);
        return
    }
    const regBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            email,
            tel,
            pass,
            rPass
        })
    }
    fetch("/register-account", regBody).then(res=>res.json()).then(data=>{
        if(data.errors){
            setErr(data.errors);
            console.log("Errors: ", data);
            return
        }
        console.log("data reg: ", data)
        window.location.href="/account";
    })
}

export function handleXClick(e,setErr, err, ind){
    let newErrs = err.filter((_, index)=> index != ind)
    setErr(newErrs);
    
}
export function errorsRender(err, setErr){
    if(!err){return}
    return err!=[]&&err.map((msg, ind)=>{
            
            return <ErrorMsg msg={msg.msg} onXClick={e=>handleXClick(e, setErr, err, ind)} key={ind}/>
        })
}

export function errsEffect(hasMounted, err, init){
    if(!hasMounted.current){
        hasMounted.current = true;
        return
    }
    if(err){
        const errList= document.querySelectorAll("."+init+".err")

    }
}