import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
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
          <div className={style.buttons}>
            <Button
              variant="success"
              onClick={() => handleAcceptClick(review.id)}
            >
              Aceptar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteClick(review.id)}
            >
              Eliminar
            </Button>
          </div>
          <ReviewCard key={review.id} review={review} />
        </div>
      ))}
    </div>
  ) : (
    <div>No more reviews to process!</div>
  );
};

export default ReviewManagement;
