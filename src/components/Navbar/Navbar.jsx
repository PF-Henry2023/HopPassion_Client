import style from "./navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import logo_light from "../../assets/logo_light.png";
import profile from "../../assets/profile.png";
import cart from "../../assets/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/actions/actions";
import { useState } from "react";

export default function NavBar() {

  const dispatch = useDispatch();
  const query = useSelector((state) => state.query)
  const [ input, setInput ] = useState(null)

  function handleSearch(event) {
    dispatch(setSearchQuery(input))
  }

  function handleInputChange(event) {
    setInput(event.target.value)
  }

  return (
    <>
      <Navbar className={style.container}>
        <img src={logo_light} alt="" className={style.logoLight} />
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
              <button className={style.searchButton} type="submit" onClick={handleSearch}>
                Buscar
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <img src={profile} alt="" className={style.cart} />
        <img src={cart} alt="" className={style.profile} />
      </Navbar>
    </>
  );
}
