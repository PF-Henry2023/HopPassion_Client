import style from "./ReviewCard.module.css";
import Rating from "../../Rating/Rating";
const ReviewCard = () => {
  return (
    <div className={style.mainContainer}>
      <div>nombre y fecha</div>
      <Rating />
      <div>comentario</div>
    </div>
  );
};

export default ReviewCard;
