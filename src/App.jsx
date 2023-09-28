import './App.css';
import NavBar from '../components/navbar/navbar';
import Filters from '../components/filters/filters';
import Carousel from "../components/carrousel/carrousel";
import CardContainer from '../components/CardContainer/CardContainer';
import CardP from "../components/Card/CardP";
import Favorites from "../components/Favorites/Favorites"
import Footer from '../components/Footer/Footer';

function App() {

  return (
    <>
      <NavBar />
      <Filters />
      <Carousel />
      <CardContainer />
      <CardP />
      <Favorites />
      <Footer />
    </>
  )
}

export default App
