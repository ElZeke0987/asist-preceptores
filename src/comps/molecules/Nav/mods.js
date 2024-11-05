import { header } from "express-validator";
import { useEffect, useRef } from "react";

export function verifyRole(role){
    useEffect(e=>{

    },[]);
}
let bodyReq={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: {
        userinfo: user
    }
}


export function reqPage(page, user){
    
    fetch("/"+page, bodyReq);
}