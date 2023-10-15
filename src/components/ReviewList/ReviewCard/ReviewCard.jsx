import style from "./ReviewCard.module.css";
import StaticRating from "../../Rating/StaticRating";
const ReviewCard = ({ review }) => {
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Obtén los componentes de la fecha
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son base 0
    const year = date.getFullYear().toString();

    return `${month} - ${day} - ${year}`;
  };

  const splitByBackticks = (str) => {
    if (str === null || str === undefined) {
      return ["", ""];
    }

    const firstBacktick = str.indexOf("`");
    if (firstBacktick === -1) {
      return ["", str];
    }

    const firstPart = str.slice(0, firstBacktick);
    const secondPart = str.slice(firstBacktick + 1).replace(/`/g, " ");

    return [firstPart, secondPart];
  };
  return (
    <div className={style.mainContainer}>
      <div className={style.nameDate}>
        <div className={style.name}>{review.User.user}</div>
        <div className={style.date}>{formatDate(review.updatedAt)}</div>
      </div>
      <div className={style.starContainer}>
        <div className={style.stars}>
          <StaticRating
            score={review.rating}
            starSpacing={10}
            starDimension={17}
          />
        </div>
      </div>
      <div className={style.commentContainer}>
        {splitByBackticks(review.comment)[0] ? (
          <div className={style.name}>
            {splitByBackticks(review.comment)[0]}
          </div>
        ) : (
          <> </>
        )}
        {splitByBackticks(review.comment)[1] ? (
          <div className={style.comment}>
            {splitByBackticks(review.comment)[1]}
          </div>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
