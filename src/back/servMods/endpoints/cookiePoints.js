import { JsonWebTokenError, sign } from "jsonwebtoken";


function generateAuthToken(user){
    const payload = {
        id: user.id,
        username: user.name,
        rol: user.rol,
    };
    const clave_finals='clave_finals';//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------------- preguntar y cambiar dependiendo el cliente
    const options = { 
        expiresIn: '365d', //1 año
        algorithms: ['HS256'],
        //alg: "none",//para pruebas
    }
    return sign(payload, clave_finals, options);
}

export function setInitCookies(req, res){
    
    res.cookie('authToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
        path: '/',
    });
    res.send('¡Cookie segura configurada!');
}