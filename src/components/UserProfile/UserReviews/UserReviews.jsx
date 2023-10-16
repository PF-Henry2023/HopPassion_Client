 import styles from "./UserReviews.module.css";
 import { ArrowLeft } from "react-bootstrap-icons";

 const PendingReviews = ({ onBackClick }) => {
   return (
     <div className={styles.container}>
      <div className={styles.header}>
        <ArrowLeft className={styles.backButton} onClick={onBackClick} />
      </div>
       aca
     </div>
   );
 };

 export default PendingReviews;
