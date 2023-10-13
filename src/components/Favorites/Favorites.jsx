import style from "./Favorites.module.css";
import Card from "../Card/Card";

export default function Favorites() {
  return (
    <div className={style.container}>
      <Card
        title="Cerveza IPA"
        price="5.99"
        image="https://res.cloudinary.com/dkwvnp3ut/image/upload/v1695689024/HopPassion/3.png"
      />
    </div>
  );
}
