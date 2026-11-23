
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Bienvenido de nuevo</h1>
        <p className="auth-description">
          Inicia sesion para continuar en BitBazar
        </p>

        <form>
          <label>Correo electronico</label>
          <input
            type="email"
            placeholder="Introduce tu correo"
            required
          />

          <label>Contrasena</label>
          <input
            type="password"
            placeholder="Introduce tu contrasena"
            required
          />

          <button type="submit">Iniciar sesion</button>
        </form>

        <p className="auth-link">
          ¿Todavia no tienes cuenta?
          <Link to="/register"> Registrate aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
