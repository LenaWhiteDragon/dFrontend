import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import imagePlaceholder from "../../../assets/images/image_placeholder.png";

type Props = {
  productName: string;
  productId: number;
  productPhoto?: string;
};

export function ProductCard(props: Props) {
  const navigate = useNavigate();

  async function goToProduct() {
    navigate("/orderProduct/product/" + props.productId);
  }

  return (
    <div className={styles.cardProduct}>
      <Link
        to={"/orderProduct/product/" + props.productId}
        className={styles.cardContainer}
      >
        <img
          src={props.productPhoto || imagePlaceholder}
          alt="Product"
          className={styles.cardImg}
        />
      </Link>
      <div className={styles.cardInfo}>
        <p>{props.productName}</p>
        <button onClick={goToProduct}>Перейти к оборудованию</button>
      </div>
    </div>
  );
}
