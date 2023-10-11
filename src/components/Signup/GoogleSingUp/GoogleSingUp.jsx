import GoogleLogin from "react-google-login";
import { signupOauth2 } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./GoogleSingUp.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const GoogleSingUp = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user == null) {
      return;
    }
    navigate("/");
  }, [user]);

  const { clientId } = props;

  function handleSignupError() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error iniciando sesión, email ya registrado.",
    });
  }

  const onFailure = (error) => {
    handleSignupError();
  };

  const onSuccess = (response) => {
    const { tokenId } = response;
    dispatch(signupOauth2(tokenId, () => handleSignupError()));
  };

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
