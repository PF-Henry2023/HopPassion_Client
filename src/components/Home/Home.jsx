import "./Home.module.css";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Carousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Favorites from "../Favorites/Favorites";
import Alert from "../Alert/Alert";

const Home = () => {
  return (
    <div>
      <Alert />
      <Navbar />
      <Carousel />
      <Favorites />
      <Filters />
      <CardContainer />
      <Card />
      <Footer />
    </div>
  );
};

export default Home;
