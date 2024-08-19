let logBut = document.querySelector(".l-button");
let logUsEm = document.querySelector(".l-useroemail");
let logPass = document.querySelector(".l-password");

let regBut = document.querySelector(".r-button");
let regUser = document.querySelector(".r-username");
let regEmail = document.querySelector(".r-email");
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
        if(data.error){
            data.error.forEach(err => console.log("Error: "+err.msg));
            return 
        }
        console.log(data);
    });
})

regBut.addEventListener("click",()=>{
    let regValues={
        username: regUser.value,
        email: regEmail.value,
        pass: regPass.value,
        rPass: regRepPass.value
    }
    fetch("/register-account",regValues)
    .then( res => res.json())
    .then( dataRes =>{
        if(dataRes.error){
            return dataRes.errors.forEach(err=>console.log(err));
        }
        console.log(dataRes.msg);

    })
})