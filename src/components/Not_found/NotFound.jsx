import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <h1 className="tittle">404 Error Page</h1>
      <p class="zoom-area">
        Lo sentimos, esta pagina no se encuentra disponible.{" "}
      </p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <Link to="/">
          <a class="more-link">Volver a la pagina principal</a>
        </Link>
      </div>
      <Footer />
    </>
  );
}
