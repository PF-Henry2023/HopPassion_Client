import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/NavigationUtils"
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Details from "./components/Details/Details";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import SignUp from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import UserSessionManager from "./components/UserSessionManager/UserSessionManager";
import CartSessionManager from "./components/CartSessionManager/CartSessionManager";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway";
import PaymentStatus from "./components/PaymentGateway/PaymentStatus";
import Alert18 from "./components/Alerts/Alert18";
import AdminProfile from "./components/Admin/AdminProfile";
import Protected from "./components/Protected/Protected";
import { useEffect } from "react";

function App() {
  
  const navigate = useNavigate()

  useEffect(() => {
    setNavigate(navigate)
  }, [])

  return (
    <div className="app">
      <Alert18 />
      <CartSessionManager />
      <UserSessionManager />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/product/:id" element={<Details />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/profile/:id" element={
        <Protected requiredRole={["user"]}>
          <UserProfile />
        </Protected>
        } />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/adminprofile/:id" element={
        <Protected requiredRole={[ "admin"]}>
          <AdminProfile />
        </Protected>
        }/>
        <Route
          path="/payment/start"
          element={<PaymentGateway />}
        />
        <Route path="/payment/result" element={<PaymentStatus />}></Route>
      </Routes>
    </div>
  );
}

export default App;
