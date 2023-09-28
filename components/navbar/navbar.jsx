import style from "./navbar.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import logo_light from '../../src/assets/logo_light.png';
import profile from '../../src/assets/profile.png';
import cart from '../../src/assets/cart.png';

export default function NavBar() {
    return (
        <>
            <Navbar className={style.container}>
                <img src={logo_light} alt="" className={style.logoLight}/>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className={style.collapsedContent} id="basic-navbar-nav">
                        <Nav className={style.navContent}> 
                            <FormControl className={style.searchField} type="text" placeholder="Busca tu cerveza favorita"  />
                            <button className={style.searchButton} type="submit">Buscar</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <img src={profile} alt="" className={style.cart}/>
                <img src={cart} alt="" className={style.profile}/>
            </Navbar>
        </>
    );
}



