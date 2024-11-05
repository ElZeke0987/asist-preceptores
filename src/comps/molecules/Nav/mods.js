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

const defUser={
    username: "elpepe",
    email: "pepe@gmail.com",
    pass: "1234%t&6eE",
}
export function reqPage(page="", user=defUser){
    
    return fetch("/"+page, bodyReq);
}