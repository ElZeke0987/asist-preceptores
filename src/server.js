const mysql = require("mysql");

async function mySQLConnection(query){
    let conn = mysql.createConnection({
        host: "127.0.0.1",
        database: "escuela",
        user: "root",
        password: ""
    })
    try{
        await query(conn);//Aca esta el unico problema que tengo ahora, las query deben ser promesas y necesito mysql2/promise
    }catch (error){
        throw error;
    }finally{
        conn.end();
    }
    
}

const { body, validationResult } = require("express-validator");

const express = require("express");
const fs = require("fs");
const path = require("path");
const { error, time } = require("console");

let app = express();
let public = path.join(__dirname, "public");

app.use(express.static(public));
app.use(express.json());

function vldExistence(fld, val){
    let qry=`SELECT * FROM cuenta WHERE ${fld}='${val}'`;
    let state;
    mySQLConnection((conn)=>{
        let state;
        conn.query(qry, (err, results)=>{
            if(results[0]!=undefined) {
                console.log(`${fld} ${val} already exists`)
                state=false;
                return state;
            }
            state=true;
            return state;
        });
       
    }).then((s)=>{
        console.log("line 57: ",s)
        return s;
    }).catch((err)=>{
        throw err;
    })
}

app.get("/", (req, res)=>{
    fs.readFile(path.join(public, "index.html"), (err, page)=>{
        if(err)throw err;
        res.setHeader("Content-Type", "text/html")
        res.sendFile(page);
    })
})

app.post("/login-account",[
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio")
],(req, res)=>{
    let dataBody = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    mySQLConnection((conn)=>{
        conn.query(`
            SELECT * FROM cuenta 
            WHERE username = ${dataBody.userOEmail} 
            OR email = ${dataBody.userOEmail} 
            AND password = ${dataBody.password}`, 
            (err, result)=>{
                if(err){
                    res.send({msg:"Hubo un error en la contraseña o el usuario "+err});
                    return err;
                }
                res.send("LOGEO TOTALMENTE EXITOSO")
                
        })
    })
})

app.post("/register-account",
    [
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
    body("username", "username already exists").custom(value=> {console.log(vldExistence("username", value))}),
    body("email", "email already exists").custom(value=>{console.log(vldExistence("email", value))}),
    ],
    (req, res)=>{
        let body = req.body;
        let errors = validationResult(req);
        res.setHeader("Content-Type", "application/json");
        if(!errors.isEmpty()){return res.status(400).json({errors: errors.array()})}
        let telNumber = body.tel != "" ? body.tel:"NULL";
        let queryIns=`
        INSERT INTO cuenta (id, username, email, password, reg_date, telefono,imagen) 
        VALUES (NULL, ?, ?, ?, current_timestamp(), 
        ?, NULL)`
        
        mySQLConnection((conn)=>{
            conn.query(queryIns, [body.username, body.email, body.pass, telNumber],
            (err)=>{
                if(err){throw err};
                console.log("Registro exitoso de "+body.username+" email: "+body.email); //Se puede quitar
            })
        })
})

app.post("/load-courses", (req, res)=>{
    res.setHeader("Content-Type", "application/json");
    let searchCourse=`SELECT * FROM cursos WHERE turno='${req.body.turno}' `
    mySQLConnection((conn)=>{
        conn.query(searchCourse, (err, cursos)=>{
            if(err) throw err;
            res.send({couList: cursos});
        })
    })
})

app.post("/load-alumns", (req,res)=>{
    let alumnsParamsBody = req.body;
    res.setHeader("Content-Type", "application/json");
    let searchAlumns= alumnsParamsBody.grupo ?
    `SELECT * FROM alumnos WHERE curso_id=${alumnsParamsBody.courseId} AND grupo_tal='${alumnsParamsBody.grupo}'`
    :
    `SELECT * FROM alumnos WHERE curso_id=${alumnsParamsBody.courseId}`;
    
    mySQLConnection((conn)=>{
        conn.query(searchAlumns, (err, alumnos)=>{
            if(err) throw err;
            res.send({alumnsList: alumnos})
        })
    })
})

app.post("/submit-presence",(req, res)=>{
    let asistBody = req.body;
    //Consultas sujeta a futuras modificaciones
    let newClass = `INSERT INTO clases (id, materia_class_id, submit_datetime, curso_id, prof_asist, hora_enum, modulo, grupo_tal, asistencias, justificada) VALUES (NULL, NULL, current_timestamp(), ?, ?, NULL, ?, ?, ?, ?)`;
    mySQLConnection(conn=>{
        conn.query(newClass, [asistBody.courseId, asistBody.prof_asist, asistBody.modv, asistBody.grupo, asistBody.presentes, asistBody.justificada], 
        (err, results)=>{
                if(err)throw err;
                asistBody.asistArr.forEach(asist=>{
                    asist.justificada = asistBody.justificada ? true : asist.justificada;
                    console.log("Alumno "+asist.nombre_alumno+" ",asist.justificada);
                    let newAsistance = `INSERT INTO asistencias (id, alumno_id, fecha, presencia, modulo, clase_id, name_completo, grupo_tal, justificada) VALUES (NULL, ?, current_timestamp(), ?, ?, ?, ?, ?, ?)`;
                    mySQLConnection(conn=>conn.query(newAsistance, [asist.id, asist.presencia, asistBody.modv, results.insertId, asist.nombre_alumno, asistBody.grupo, asistBody.justificada], err=>{if(err)throw err}));
                    let alumnInas=`UPDATE alumnos SET inasistencias = inasistencias + 1 WHERE id = ?`;
                    if(!asist.presencia&&!asist.justificada)mySQLConnection(conn=>{conn.query(alumnInas,[asist.id],err=>{if(err)throw err})});
                })
        })
    })
    
    
    res.send(true)
})

let PORT=3000;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

