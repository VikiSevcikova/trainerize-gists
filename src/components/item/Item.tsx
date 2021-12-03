import { useEffect, useState } from "react";
import { ItemProps } from "../../models/IItem";
import "./Item.css";
import PopUp from "../popup/PopUp";

const Item : React.FC<ItemProps> = ({item}) => {
    const [show, setShow] = useState(false);

    useEffect(()=>{
        let timer = setTimeout(()=>setShow(false), 1000);
        
        return () => {
            clearTimeout(timer);
        }
    },[show])

    return(
        <>
            <li className="item-container" onClick={()=>setShow(true)}>
                <img alt={item.owner} src={item.image}/>
                <p>{item.names.join(', ')}</p>
            </li>
            <PopUp owner={item.owner} image={item.image} show={show}/>
        </>
    )
}

export default Item;