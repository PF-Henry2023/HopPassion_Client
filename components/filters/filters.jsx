import style from "./filters.module.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {

    return (
        <>
            <Navbar className={style.container}>
                <Container>
                <Nav className={style.content}>
                    <Nav.Link href="#filtro1">Filtro v</Nav.Link>
                    <Nav.Link href="#filtro2">Filtro v</Nav.Link>
                    <Nav.Link href="#filtro3">Filtro v</Nav.Link>
                    <Nav.Link href="#orden1">Ordenamiento v</Nav.Link>
                    <Nav.Link href="#orden2">Ordenamiento v</Nav.Link>
                    <Nav.Link href="#orden3">Ordenamiento v</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
  )
}