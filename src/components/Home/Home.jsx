import "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";
import ControlledCarousel from "../Carousel/Carousel";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ControlledCarousel />
      {/* <Favorites /> */}
      <Filters />
      <CardContainer />
      <Footer />
    </div>
  );
};

export default Home;
