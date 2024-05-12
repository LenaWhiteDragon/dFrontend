import { useNavigate, useOutletContext } from 'react-router-dom';
import './ProductCard.scss';
import imagePlaceholder from "../../../assets/images/image_placeholder.png";
import { authStorage } from '../../../authStorage';
type Props = {
    productName: string
    productId: string
}


export function ProductCard(props: Props) {
    const outletContext = useOutletContext<{openLoginModal: (pathToRedirect: string) => void}>();
    const type = "product"
    async function book() {
        if (authStorage.token == "") {
            const stringToGo:string = "/orderProduct/" + type + "/" + props.productId
            outletContext.openLoginModal(stringToGo) //после авторизации идем на продолжение записи
        }
        else 
        {
            navigate("/orderProduct/" + type + "/" + props.productId) //сразу переходим на страницу записи
           
        }
    }
    const navigate = useNavigate();
    return (
            <div className="card-doc">
                <img src={imagePlaceholder} alt="Doctor" /> 
                <div className="card-info">
                    <p>{props.productName}</p>
                    {/* <p>{props.doctorSpecialty}</p> */}
                    <button onClick={book}>Перейти к товару</button>
                </div>
            </div>
    );
}