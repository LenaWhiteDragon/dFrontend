import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import imagePlaceholder from "../../../assets/images/image_placeholder.png";

type Props = {
  productName: string;
  productId: number;
};

export function ProductCard(props: Props) {
  const navigate = useNavigate();

  async function goToProduct() {
    navigate("/orderProduct/product/" + props.productId);
  }

  return (
    <div className="card-doc">
      <img src={imagePlaceholder} alt="Doctor" />
      <div className="card-info">
        <p>{props.productName}</p>
        {/* <p>{props.doctorSpecialty}</p> */}
        <button onClick={goToProduct}>Перейти к товару</button>
      </div>
    </div>
  );
}
