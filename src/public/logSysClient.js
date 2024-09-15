import { createDatabase, readWriteOnly } from "./clientMods/indexedDBmods.js";

let logBut = document.querySelector(".l-button");
let logUsEm = document.querySelector(".l-useroemail");
let logPass = document.querySelector(".l-password");

let regBut = document.querySelector(".r-button");
let regUser = document.querySelector(".r-username");
let regEmail = document.querySelector(".r-email");
let regTel = document.querySelector(".r-tel");
let regPass = document.querySelector(".r-password");
let regRepPass = document.querySelector(".r-rep-password");

let postDestination = "./account.html";

createDatabase();

logBut.addEventListener("click",()=>{
    let logValues={
        userOEmail: logUsEm.value,
        password: logPass.value,
        existUser: true,
    }
    fetch("/login-account",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(logValues)
    })
    .then(res =>res.json())
    .then(async data => {
        if(data==undefined)return;
        if(data.errors==undefined){//zona post logeo
            window.location.href=postDestination;
            console.log("Logged as: ", data.userBody)
            await readWriteOnly("readwrite", data.userBody)
            return
        };
        data.errors.forEach(err => alert("Error: "+err.msg));//zona de manejo de errores
    });
})

regBut.addEventListener("click",()=>{
    let regValues={
        username: regUser.value,
        email: regEmail.value,
        tel: regTel.value,
        pass: regPass.value,
        rPass: regRepPass.value,
        userBody: undefined,
    };
    fetch("/register-account",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(regValues)
    })
    .then( res => {
        console.log(res.status);
        return res.json()
    })
    .then( async dataRes =>{
        if(dataRes==undefined){return};
        if(dataRes.errors==undefined){//zona post registro
            window.location.href=postDestination;
            //1234%t&6eE
            await readWriteOnly("readwrite", data.userBody)
            return
        };
        dataRes.errors.forEach(err=>alert("Error al ingresar datos de registro: "+err.msg));//zona de manejo de errores

    })
})