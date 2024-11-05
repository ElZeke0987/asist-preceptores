import { body } from "express-validator";
import { mySQLConnection } from "../connection.js";

function userValues(res){
    return{
        id: 1,
        username: res[0].username,
        email: res[0].email,
        tel: res[0].telefono,
        rol: res[0].rol,
        imagenUrl: res[0].imagen,

    }
}

async function vldExistence(fld, val){//Valida la existencia de cierto usuario en base a cierta condicion
    let qry=fld[1]?`SELECT * FROM cuentas WHERE ${fld[0]}=? OR ${fld[1]}=?`:`SELECT * FROM cuentas WHERE ${fld}=?`;//Dinamico entre arrays (varias condiciones) y solo una condi.
    let rep = fld[1]?[val, val]:[val];
    let res = await mySQLConnection(qry, rep);//Si no hay nada de lo que buscaste devuelve true
    //console.log(" Validating unexistence of "+fld+" "+val+": ", res[0]==undefined ?true:userValues(res));
    return res[0]==undefined ?true:userValues(res);
}

async function validPass(pass, userOEmail) {
    let qry=`SELECT * FROM cuentas WHERE (username=? OR email=?) AND password=?`;
    let rep= [userOEmail, userOEmail, pass];
    let res = await mySQLConnection(qry, rep);
    return res[0]==undefined?true: userValues(res);
    //Si no hay coincidencias la verificacion de contraseña falla
    //true por que fallo, false si no hubo errores.
}
//1234%t&6eE
export const pageMiddles=[
    body("userInfo par is empty").not().isEmpty(),
];
export const registerMiddles = [
    body("username", "Username required").not().isEmpty(),
    body("username", "username should have at least one letter").matches(/[a-zA-Z]/),
    body("email", "Email is required").not().isEmpty(),
    body("username", "Out of range of chars for username (min 1, max 35)").isLength({min: 1, max: 35}),
    body("email", "Out of range of chars for email (max 45)").isLength({max: 45}),
    body("email", "Write correctly the email").isEmail(),
    body("tel", "Tel number is required").not().isEmpty(),
    body("pass", "Password required").not().isEmpty(),
    body("pass", "Min 8 chars for password").isLength({min: 8}),
    body("pass", "One number, caps or symbol is required").matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    body("rPass", "Repeat password please").not().isEmpty(),
    body("rPass", "Both password fields will be the same").custom((value, { req })=>{
        if(value != req.body.pass){throw new Error("Passwords do not match")}
        return true;
    }),
    body("username", "username already exists").custom(async value=> {
        let res = await vldExistence(["username"], value);
        if(!res && !res.username)throw new Error("Username already exists");
    }),
    body("email", "email already exists").custom(async (value, {req})=>{
        let res = await vldExistence(["email"], value);
        if(!res && !res.username)throw new Error("Email already exists");
        req.body.userBody = res;
    }),
]
//1234%t&6eE
export const logMiddles = [
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio"),
    body("userOEmail").custom( async (value, { req })=>{
        if(!value||!req.body.password)return;
        let toRet=await vldExistence(["username", "email"], value);
        //console.log("toRet: ",toRet);
        if(toRet==true){req.body.existUser=false; throw new Error("Username or email doesn't exist")}
        req.body.userBody = toRet
    }),
    body("password").custom(async (pass, { req })=>{
        if(!req.body.userOEmail||!pass||req.body.existUser==false){return};
        let userBody=await validPass(pass, req.body.userOEmail);
        //console.log(userBody);
        if( userBody==true ){throw new Error("Password isn't correct")};
        req.body.userBody = userBody;
    }),//A futuro hacer el middleware mas avanzado y que si ingresa muchas veces una contraseña poner cooldown
];
