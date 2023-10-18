import style from "./Favorites.module.css";
import Card from "../Card/Card";

export default function Favorites(props) {
  const { favorites } = props;
  return (
    <div className={style.container}>
      {
        favorites?.map(e => (
          <Card
            key={e.id}
            id={e.id}
            title={e.name}
            price={e.price}
            image={e.image}
          />
        ))
      }
    </div>
  );
}
