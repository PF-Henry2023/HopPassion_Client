import GoogleLogin from "react-google-login";
import { signupOauth2 } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import "./GoogleSingUp.css";

const GoogleSingUp = (props) => {
  const dispatch = useDispatch();
  const { clientId } = props;

  function handleSignupError() {
    alert("Error al crear el usuario.");
  }
  
  const onSuccess = (response) => {
    const { tokenId } = response;
    dispatch(signupOauth2(tokenId, handleSignupError));
    console.log(response);
  }
  const onFailure = (error) => {
    console.log(error);
  }

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sing up with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleSingUp;
