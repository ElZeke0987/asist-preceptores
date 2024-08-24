let logBut = document.querySelector(".l-button");
let logUsEm = document.querySelector(".l-useroemail");
let logPass = document.querySelector(".l-password");

let regBut = document.querySelector(".r-button");
let regUser = document.querySelector(".r-username");
let regEmail = document.querySelector(".r-email");
let regTel = document.querySelector(".r-tel");
let regPass = document.querySelector(".r-password");
let regRepPass = document.querySelector(".r-rep-password");

logBut.addEventListener("click",()=>{
    let logValues={
        userOEmail: logUsEm.value,
        password: logPass.value
    }
    fetch("/login-account",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(logValues)
    })
    .then(res =>res.json())
    .then(data => {
        if(data==undefined)return;
        if(data.errors==undefined)return;
        data.errors.forEach(err => console.log("Error: "+err.msg));
        return 
        console.log(data);
    });
})

regBut.addEventListener("click",()=>{
    let regValues={
        username: regUser.value,
        email: regEmail.value,
        tel: regTel.value,
        pass: regPass.value,
        rPass: regRepPass.value
    };
    fetch("/register-account",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(regValues)
    })
    .then( res => {
        if(res.status==400){return res.json()}
        else{window.location.href="./index.html"}
    })
    .then( dataRes =>{
        if(dataRes==undefined)return;
        if(dataRes.errors==undefined)return;
        dataRes.errors.forEach(err=>alert("Error al ingresar datos de registro: "+err.msg));

    })
})