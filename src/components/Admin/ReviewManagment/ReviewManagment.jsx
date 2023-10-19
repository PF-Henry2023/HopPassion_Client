import "bootstrap/dist/css/bootstrap.min.css";
import ReviewCard from "../../ReviewList/ReviewCard/ReviewCard";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import style from "./ReviewManagment.module.css";
import {
  reviewProcessed,
  deleteReview,
  getReviewsUnreviewed,
  cleanReviews,
} from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const selectReviewList = (state) => state.reviewList;

const getMemoizedReviewList = createSelector(
  [selectReviewList],
  (reviewList) => reviewList
);

const ReviewManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsUnreviewed());
    return () => {
      dispatch(cleanReviews());
    };
  }, [dispatch]);

  const reviews = useSelector(getMemoizedReviewList);
console.log(reviews)
  const handleAcceptClick = (idRev) => {
    dispatch(reviewProcessed(idRev));
  };

  const handleDeleteClick = (idRev) => {
    dispatch(deleteReview(idRev));
  };

  return reviews.length ? (
    <div className={style.mainContainer}>
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard key={review.id} review={review} />
          <div className={style.buttons}>
            <button
              className={style.check}
              variant="success"
              onClick={() => handleAcceptClick(review.id)}
            >
              Leído
            </button>
            <button
              className={style.delete}
              variant="danger"
              onClick={() => handleDeleteClick(review.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>Cargando reseñas...</div>
  );
};

export default ReviewManagement;
