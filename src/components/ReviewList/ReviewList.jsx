import style from "./ReviewList.module.css";
import ReviewCard from "./ReviewCard/ReviewCard";
import StaticRating from "../Rating/StaticRating";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectReviewList = (state) => state.reviewList;

const getMemoizedReviewList = createSelector(
  [selectReviewList],
  (reviewList) => reviewList
);
//const rev = useSelector(getMemoizedReviewList);
const ReviewList = ({ isLoading }) => {
  const rev = useSelector(getMemoizedReviewList);

  const calcularPromedioRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const promedio = totalRatings / reviews.length;
    return Math.round(promedio * 10) / 10;
  };

  const promedio = calcularPromedioRating(rev);

  let signo;
  if (rev.length) {
    signo = "!";
  } else {
    signo = "?";
  }
  return (
    !isLoading && (
      <div className={style.mainContainer}>
        <div name="title" className={style.title}>
          {`Feedback From Our Customers${signo}`}
        </div>
        {rev.length === 0 ? (
          <div className={style.noReviewsYet}>No reviews yet.</div>
        ) : (
          <div>
            <div className={style.totalRating}>
              <div className={style.totalStar}>
                <StaticRating
                  score={promedio}
                  starDimension={23}
                  starSpacing={0.1}
                />
              </div>
              <div className={style.outOf}>{`${promedio} out of 5 stars`}</div>
            </div>
            <div className={style.totalReviews}>{rev.length} reviews</div>
            <div className={style.listContainer}>
              {rev.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ReviewList;
