import jwtDecode from "jwt-decode";

export function handleUserLogin(token) {
  console.log(token);
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
    postalCode: decoded.postalCode,
    city: decoded.city,
    country: decoded.country,
  };

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("id", user.id);
}

export const updateUserLocal = (input) => {
  console.log("entro a la funcion ");
  window.localStorage.removeItem("user");
  const user = {
    id: input.id,
    name: input.name,
    lastName: input.lastName,
    address: input.address,
    email: input.email,
    phone: input.phone,
    role: input.role,
    password: input.password,
    postalCode: input.postalCode,
    city: input.city,
    country: input.country,
  };
  window.localStorage.setItem("user", JSON.stringify(user));
  console.log(user);
  return;
};

export function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}

export function setAgeConfirmation(confirmed) {
  window.localStorage.setItem("over18", confirmed);
}

export function checkAgeConfirmation() {
  return window.localStorage.getItem("over18") ?? false;
}

export function mapUserToUserInfo(user) {
  return {
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    postalCode: user.postalCode || "",
    password: user.password || "",
  };
}
