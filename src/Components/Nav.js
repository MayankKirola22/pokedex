import './Nav.css';
import logo from "../Resources/pokelogo.png";
import {useNavigate} from "react-router-dom";

export default function Nav(){
    const navigate=useNavigate();
    return(
        <div id="Nav">
            <img src={logo} onClick={()=>navigate('')} className='logo' alt='Logo'/>
            <div className='navOptions'>
                <div onClick={()=>navigate('')} className='navOption'>Home</div>
                <div onClick={()=>navigate('search')} className='navOption'>Search</div>
            </div>
        </div>
    )
}