import "./Rating.css";
import StarRatings from "react-star-ratings";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import ReviewsTotalStars from "./ReviewsTotalStars";
const Rating = (props) => {
  const { score } = props;

 /*  const renderStars = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= score) {
<<<<<<< Updated upstream
        stars.push(<StarFill color="blue" key={i} className="starFill" />);
      } else if (i - 0.5 < score && score < i) {
        stars.push(<StarHalf key={i} className="start" />);
=======
        stars.push(<StarFill key={i} className={style.star} />);
      } else if (i - 0.5 < score && score < i) {
        stars.push(<StarHalf key={i} className={style.star} />);
>>>>>>> Stashed changes
      } else {
        stars.push(<Star key={i} className="start" />);
      }
    }

    return stars;
  }; */

<<<<<<< Updated upstream
  return (
    <>
      <div className="mainContainer">Calificacion: <ReviewsTotalStars rating={props.score}/></div>
    </>
  );
=======
  return <div className={style.mainContainer}>{renderStars()}</div>;
>>>>>>> Stashed changes
};

export default Rating;
