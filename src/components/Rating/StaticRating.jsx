import { useState } from "react";
import StarRatings from "react-star-ratings";

export default function () {


  return (
    <StarRatings
    rating={rating}
    starRatedColor="blue"
    changeRating={this.changeRating}
    numberOfStars={6}
    name='rating'
  />
  );
}
