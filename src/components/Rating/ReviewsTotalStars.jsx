import StarRatings from "react-star-ratings";


export default function ReviewsTotalStars(props) {
  const { rating } = props;
  return (
    <StarRatings rating={rating} starDimension="40px" starSpacing="15px" starRatedColor="rgb(218, 86, 36)"/>
  )
}
