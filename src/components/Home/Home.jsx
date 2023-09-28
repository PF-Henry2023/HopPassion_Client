import "./Home.module.css";
import Card from "./Card/Card";
import Navbar from "./Navbar/Navbar";
import CardContainer from "./CardContainer/CardContainer";
import Footer from "./Footer/Footer";
import Carousel from "./Carousel/Carousel";
import Filters from "./Filters/Filters";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Filters />
      <Carousel />
      <CardContainer />
      <Card />
      <Favorites />
      <Footer />
    </div>
  );
};

export default Home;
