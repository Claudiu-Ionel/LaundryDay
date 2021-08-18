import './Login.css';

function LoginForm() {
    return ( <div className="loginFormContainer">
        <p className="welcome01">Välkommen till tvättstugaName</p>
        <p className="welcome02">Ange ditt användarsnamn  (eller personnummer, telefonnummer, e-postadress) och lösenord:</p>
        <form action="" method="get" className="usernameAndPasswordForm">
            <input type="text" name="username" id="username" required placeholder="användarsnamn" />
            <input type="text" name="password" id="password" required placeholder="lösenord" />
            <button className="loginBtn">Logga mig in</button>
        </form>
        
    </div> )
}

export default LoginForm;