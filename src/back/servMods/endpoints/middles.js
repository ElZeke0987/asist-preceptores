
async function vldExistence(fld, val){//Valida la existencia de cierto usuario
    let qry=`SELECT * FROM cuenta WHERE ${fld}='${val}'`;
    return await mySQLConnection(async (conn)=>{
        let [err, result] = await conn.execute(qry)
        if(err)throw err;
        if(results[0]!=undefined) {
            console.log("Field existente para "+val+": true");
            return true;
        }
        console.log("Field existente para "+val+": false");
        return false; 
    })
}

export const registerMiddles = [
    body("username", "Username required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("email", "Write correctly the email").isEmail(),
    body("tel", "tel number is required").not().isEmpty(),
    body("pass", "Password required").not().isEmpty(),
    body("rPass", "Repeat password please").not().isEmpty(),
    body("rPass", "Both password fields will be the same").custom((value, { req })=>{
        if(value != req.body.pass){throw new Error("Passwords do not match");return false;}
        return true;
    }),
    body("username", "username already exists").custom(value=> {console.log("Verificacion de usuario existente: ",vldExistence("username", value))}),
    body("email", "email already exists").custom(value=>{console.log("Verificacion de email existente: ",vldExistence("email", value))}),
]
export const logMiddles = [
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio")
];
