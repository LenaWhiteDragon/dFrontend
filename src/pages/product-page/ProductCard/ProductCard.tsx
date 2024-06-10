import { useNavigate } from "react-router-dom";
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
      <img src={props.productPhoto || imagePlaceholder} alt="Product" />
      <div className={styles.cardInfo}>
        <p>{props.productName}</p>
        {/* <p>{props.doctorSpecialty}</p> */}
        <button onClick={goToProduct}>Перейти к товару</button>
      </div>
    </div>
  );
}
