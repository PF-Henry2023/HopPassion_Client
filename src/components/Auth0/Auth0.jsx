import { useAuth0 } from "@auth0/auth0-react";
import HopPassionClient from "../../utils/NetworkingUtils";

export default function Auth0() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await HopPassionClient.get("/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(token);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Auth0 authentication</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>
            Iniciar Sesión con Google en ventana emergente
          </button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Iniciar Sesión con Google</button>
        </li>
        <li>
          <button onClick={logout}>Cerrar Sesión</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? "Logged in" : "not logged in"}</h3>

      <ul>
        <li>
          <button onClick={callProtectedApi}>Call Protect API route</button>
        </li>
      </ul>
      {isAuthenticated && (
        <pre style={{ textAling: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}
