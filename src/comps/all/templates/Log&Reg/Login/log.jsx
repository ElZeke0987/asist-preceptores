
export default function Login(){

    return(
        <>
            <h1>Iniciar sesion</h1>
            <form class="init-form login">
                <label>Username/email</label>
                <input class="l-useroemail" placeholder="can only one of them"/>

                <label>Password</label>
                <input class="l-password" type="password" placeholder="Insert password"/>

                
            </form>
            <button class="l-button">Iniciar sesion</button>
        </>
    )
}