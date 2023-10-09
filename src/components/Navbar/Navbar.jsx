import style from "./Navbar.module.css";
import { Link } from "react-router-dom"; // Import Link
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import logo_light from "../../assets/logo_light.png";
import profile from "../../assets/profile.png";
import cartIcon from "../../assets/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, logout } from "../../redux/actions/actions";
import { useState } from "react";

export default function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const query = useSelector((state) => state.query);
  const cart = useSelector((state) => state.cart);

  const [input, setInput] = useState(null);

  function handleSearch(event) {
    dispatch(setSearchQuery(input));
  }

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleLogout() {
    dispatch(logout());
  }

  function drawUserSection() {
    if (user) {
      return (
        <>
          <button onClick={handleLogout}>Logout</button>
          <span className={style.cartItemCount}>{user.name} </span>
          <img src={profile} alt="" className={style.cart} />
          <span className={style.cartItemCount}>
            {cart.products ? cart.products.length : null}{" "}
          </span>
          <Link to={"/cart"} className={style.link}>
            <img src={cartIcon} alt="" className={style.profile} />
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </>
      );
    }
  }

  return (
    <>
      <Navbar className={style.container}>
        <Link to="/" className={style.logoLink}>
          <img src={logo_light} alt="" className={style.logoLight} />
        </Link>

        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className={style.collapsedContent}
            id="basic-navbar-nav"
          >
            <Nav className={style.navContent}>
              <FormControl
                className={style.searchField}
                type="text"
                placeholder="Busca tu cerveza favorita"
                defaultValue={query}
                onChange={handleInputChange}
              />
              <button
                className={style.searchButton}
                type="submit"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
        {drawUserSection()}
      </Navbar>
    </>
  );
}
