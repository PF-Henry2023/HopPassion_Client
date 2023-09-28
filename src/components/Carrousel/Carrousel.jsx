import style from "./carrousel.module.css";
//import Carousel from 'react-bootstrap/Carousel';
import imageBackground from "../../assets/imageBackground.png";

const Carrousel = () => {
  return (
    <div>
      <img src={imageBackground} className={style.image} />
    </div>
  );
};

export default Carrousel;
