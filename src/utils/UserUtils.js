import jwtDecode from "jwt-decode";

export function handleUserLogin(token) {
  const decoded = jwtDecode(token);

  const user = {
    id: decoded.id,
    name: decoded.name,
    lastName: decoded.lastName,
    role: decoded.role,
  };

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}
