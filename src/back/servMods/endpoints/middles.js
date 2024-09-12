import { body } from "express-validator";
import { mySQLConnection } from "../connection.js";



async function vldExistence(fld, val){//Valida la existencia de cierto usuario
    let qry=`SELECT * FROM cuentas WHERE ${fld}=?`;
    let toRet;
    await mySQLConnection(qry, [val]).then(res=>toRet = res[0] == undefined);
    return toRet;
}

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
        let toRet;
        await vldExistence("username", value).then(dt=>toRet=dt);
        if(!toRet)throw new Error("Username already exists");
    }),
    body("email", "email already exists").custom(async value=>{
        let toRet;
        await vldExistence("email", value).then(dt=>toRet=dt);
        if(!toRet)throw new Error("Email already exists");
    }),
]
export const logMiddles = [
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio")
];
