import { body, header } from "express-validator";
import { useEffect, useRef } from "react";

export function verifyRole(role){//Para mostrar los links disponibles
    useEffect(e=>{

    },[]);
}


const defUser={
    username: "elpepe",
    email: "pepe@gmail.com",
    pass: "1234%t&6eE",
}
export function reqPage(page="", user=defUser){//medida de seguridad por si intentan entrar por links
    let bodyReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({//Deberia hacer busqueda en el cache aca
            "userinfo": defUser
        })
    }
    console.log("Requesting page");
    fetch(`/${page}`, bodyReq);
}