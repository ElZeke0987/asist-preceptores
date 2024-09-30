export default function Register(){
    return (
        <>
            <h1>Registrarse</h1>
        <form className="init-form register">
            <label>Username</label>
            <input className="r-username" required placeholder="max 100 chars"/>

            <label>Email</label>
            <input className="r-email"  type="email" required/>

            <label>Telefono</label>
            <input className="r-tel"  type="tel" required/>
            
            <label>Password</label>
            <input className="r-password" required type="password" placeholder="Insert password"/>
            <label>Repeat password</label>
            <input className="r-rep-password" type="password" placeholder="Repeat password"/>
            
            
        </form>
        <button className="r-button">Registrarse</button>
        </>
    )
}