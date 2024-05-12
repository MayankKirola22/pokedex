import "./PokeHome.css";
import {useNavigate} from "react-router-dom";

export default function PokeHome(){
    const navigate=useNavigate();
    return(
        <div id="PokeHome" className="screen">
            <div className="heading section">Welcome to Pokédex</div>
            <div className="pokeSetImages section">
                {Array(5).fill(0).map((value,index)=>(
                    <img key={index} className="pokesetImg" src={require(`../Resources/pokeset/${index+1}.png`)} alt='pokeset'/>
                ))}
            </div>
            <div className="section intro">
                The Pokédex is an electronic encyclopaedia that the player may be given during their journey. It displays various information about Pokémon species, including elemental types, typical sizes and locations they can be found in the wild.
                <div className="goToSearch section" onClick={()=>navigate("search")}>Go To Search</div>
            </div>
        </div>
    )
}