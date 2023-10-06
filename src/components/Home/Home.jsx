import "./Home.module.css";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Carousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Favorites from "../Favorites/Favorites";

const Home = () => {
  const storedId = window.localStorage.getItem("id");
  const user = window.localStorage.getItem("user");
  console.log("user", user);

  if (storedId !== null) {
    // Use the retrieved value as needed
    console.log("Stored Id:", storedId);
  } else {
    // Handle the case where the "id" item doesn't exist in local storage
    console.log("No 'id' item found in local storage.");
  }

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
