import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { loginOauth } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";

const GoogleLoginOatuh2 = (props) => {
  const { clientId } = props;
  const dispatch = useDispatch();

  /*  const { signIn } = useGoogleLogin({
    onSuccess: (response) => {
      const { tokenId } = response;
      setUserCredentialsOauth({
        tokenId: tokenId,
      })
      dispatch(loginOauth(userCredentialsOauth, handleLoginError))
    },
    onFailure: (error) => {
      console.log("Inicio de sesión fallido:", error);
    },
    clientId: clientId,
    cookiePolicy: "single_host_origin",
  });
*/
  function handleLoginError(error) {
    alert("Error al iniciar sesión");
  }
  const onSuccess = (response) => {
    console.log(response);
    const { tokenId } = response;
    dispatch(loginOauth(tokenId, handleLoginError));
  };
  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginOatuh2;
