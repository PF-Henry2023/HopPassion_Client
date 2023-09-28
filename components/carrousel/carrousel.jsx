import style from "./carrousel.module.css"
//import Carousel from 'react-bootstrap/Carousel';
import imageBackground from "../../src/assets/imageBackground.png"

export default function Carrousel () {
  return (
    <div>
      <img src={imageBackground} className={style.image}/>
    </div>
  );
}
