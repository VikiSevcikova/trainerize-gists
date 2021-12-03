import { PopUpProps } from "../../models/IPopUp";
import "./PopUp.css";

const PopUp : React.FC<PopUpProps> = ({owner, image, show}) => {

    return(
        <div className={`pop-up-container ${show ? 'show' : ''}`}>
            <div className="pop-up-image">
                <img alt={owner} src={image}/>
            </div> 
        </div> 
    )
}

export default PopUp;