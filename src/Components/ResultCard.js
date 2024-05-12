import "./ResultCard.css";
import blankcard from "../Resources/blankcard.png";
import {useNavigate} from "react-router-dom";

export default function ResultCard({info}){
    const navigate=useNavigate();
    return(
        <div id="ResultCard" onClick={()=>navigate(`/pokemon/${info.name}`)}>   
            <img src={blankcard} className="cardImg" alt="blank"/>
            <div className="pokeName">{info.name}</div>
        </div>
    )
}