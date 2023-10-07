import "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";

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
