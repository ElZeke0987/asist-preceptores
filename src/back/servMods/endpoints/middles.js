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

async function vldExistence(fld, val, lore){//Valida la existencia de cierto usuario en base a cierta condicion
    let qry=fld[1]?`SELECT * FROM cuentas WHERE ${fld[0]}=? OR ${fld[1]}=?`:`SELECT * FROM cuentas WHERE ${fld}=?`;//Dinamico entre arrays (varias condiciones) y solo una condi.
    let rep = fld[1]?[val, val]:[val];
    let res = await mySQLConnection(qry, rep);//Si no hay nada de lo que buscaste devuelve true
    //console.log(" Validating existence of ["+fld+"] val:"+val+": ", !(res[0]==undefined ))//?true:userValues(res));
    return !(res[0]==undefined )//?true:userValues(res);
}

async function validPass(pass, userOEmail) {
    let qry=`SELECT * FROM cuentas WHERE (username=? OR email=?) AND password=?`;
    let rep= [userOEmail, userOEmail, pass];
    let res = await mySQLConnection(qry, rep);
    return !(res[0]==undefined);
    //Verifica si es que no existe un usuario con esa contraseña, devuelve true si no existe, 
    //por ende la funcion que tiene que validar devuelve lo contrario, no existe = validPass(): false

}
//1234%t&6eE
export const pageMiddles=[
    body("userInfo par is empty").not().isEmpty(),
];
//true da el afirmativo de que paso el middle
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
    body("pass", "One number, caps or symbol is required").matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&^|])[A-Za-z\d@$!%*?&]/),
    body("rPass", "Repeat password please").not().isEmpty(),
    body("rPass", "Both password fields will be the same").custom((value, { req })=>{
        if(value != req.body.pass){throw new Error("Passwords do not match")}
        return true;
    }),
    body("username", "username already exists").custom(async value=> {
        console.log("Validated existence of username");
        await vldExistence(["username"], value, "re").then(res=>{
            if(res==true){throw new Error("Username already exist")}
            
        })
        return true
    }),
    body("email", "email already exists").custom(async (value, {req})=>{
        await vldExistence(["email"], value).then(res=>{
            if(res==true){throw new Error("Email is already in use")}
            req.body.userBody = res;
            
        })
        return true
    }),
]
//1234%t&6eE
export const logMiddles = [
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio"),
    body("userOEmail").custom( async (value, { req })=>{
        if(!value||!req.body.password)return;
        let existUser=await vldExistence(["username", "email"], value);
        if(existUser==false){req.body.existUser=false; throw new Error("Username or email doesn't exist")}
        //req.body.existUser = existUser;
        return true
    }),
    body("password").custom(async (pass, { req })=>{
        if(req.body.existUser==false){return};
        let validated=await validPass(pass, req.body.userOEmail);
        if( validated==false ){throw new Error("Password isn't correct")};
        //req.body.userBody = validated;
        return true
    }),//A futuro hacer el middleware mas avanzado y que si ingresa muchas veces una contraseña poner cooldown
];
