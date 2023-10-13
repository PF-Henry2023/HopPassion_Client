import style from "./Rating.module.css";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
const Rating = (props) => {
  const { score } = props;

  const renderStars = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= score) {
        stars.push(<StarFill key={i} className={style.star} />);
      } else if (i - 0.5 < score && score < i ) {
        stars.push(<StarHalf key={i} className={style.star} />);
      } else {
        stars.push(<Star key={i} className={style.star} />);
      }
    }

    return stars;
  };

  return (
    <div className={style.mainContainer}>
      Calificacion: {renderStars()}
    </div>
  );
};



export default Rating;
