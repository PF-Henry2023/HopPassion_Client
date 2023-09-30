import "./Home.module.css";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Carousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Favorites from "../Favorites/Favorites";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      {/* <Favorites /> */}
      <Filters />
      <CardContainer />
      <Footer />
    </div>
  );
};

export default Home;
