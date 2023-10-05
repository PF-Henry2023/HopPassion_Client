import jwtDecode from "jwt-decode";

export function handleUserLogin(token) {
  const decoded = jwtDecode(token);

  console.log(decoded);

  const user = {
    id: decoded.id,
    // name: decoded.name,
    // lastName: decoded.lastName,
  };

  // window.localStorage.setItem("token", token);
  // window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("id", user.id);
}

export function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}
