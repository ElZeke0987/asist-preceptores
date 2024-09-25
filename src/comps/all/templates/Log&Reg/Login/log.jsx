
export default function Login(){

    return(
        <>
            <h1>Iniciar sesion</h1>
            <form class="init-form login">
                <label>Username/email</label>
                <input className="l-useroemail" placeholder="can only one of them"/>

                <label>Password</label>
                <input className="l-password" type="password" placeholder="Insert password"/>

                
            </form>
            <button className="l-button">Iniciar sesion</button>
        </>
    )
}