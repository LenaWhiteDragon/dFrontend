import { useNavigate, useOutletContext } from "react-router-dom";
import "./ServiceCardContinue.scss";
import { OrderProduct } from "../OrderProduct";
import { authStorage } from "../../../auth/authStorage";
type Props = {
  serviceId: string;
  serviceName: string;
  chosenServiceId: string;
  onConfirm: (id: string, name: string) => void;
};

export function ServiceCardContinue(props: Props) {
  const outletContext = useOutletContext<{
    openLoginModal: (pathToRedirect: string) => void;
  }>();

  function chooseService() {
    props.onConfirm(props.serviceId, props.serviceName);
  }

  const navigate = useNavigate();
  return (
    <div
      className={`${
        props.chosenServiceId == props.serviceId
          ? "card-service-continue-active"
          : "card-service-continue"
      }`}
    >
      {/* <div className="card-doc"> */}
      <img
        src="https://alcovin-sale.goodsalediscount.com/files/alkowin_1/img/icon04.png"
        alt="Doctor"
      />
      <div className="card-info">
        <p>{props.serviceName}</p>
        {/* <p>{props.doctorSpecialty}</p> */}
        <button onClick={chooseService}>Выбрать услугу</button>
      </div>
    </div>
  );
}
