import jwtDecode from "jwt-decode";

export function handleUserLogin(token) {
  const decoded = jwtDecode(token);

  const user = {
    id: decoded.id,
    name: decoded.name,
    lastName: decoded.lastName,
    address: decoded.address,
    email: decoded.email,
    phone: decoded.phone,
    role: decoded.role,
    password: decoded.password,
  };

  console.log("este es el user: ", user);

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("id", user.id);
}

export function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}
