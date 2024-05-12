import { useEffect, useState } from "react";
import "./PokeType.css";
import { useParams, useNavigate } from "react-router-dom";
import sadpokemon from "../Resources/sadpokemon.png";
import sadpokemon2 from "../Resources/sadpokemon2.png";
import loading from "../Resources/loading.gif";
import ResultCard from "../Components/ResultCard";

export default function PokeType(){
    let {type} = useParams();
    const [typeDetails,setTypeDetails] = useState(null);
    const [fetchError,setFetchError] = useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
            fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`,{
                method:"GET"
            }).then( result=>{
                if(result.status===200)
                    result.text().then(res=>setTypeDetails(JSON.parse(res)))
                else
                    result.text().then(()=>setTypeDetails("Not Found"))
            }).catch(()=>setFetchError(true))
    },[type])
    return(
        <>
            {!fetchError?typeDetails==="Not Found"?
                <div className="noRes screen">
                    <img src={sadpokemon2} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Type Not Found...</div>
                </div>
                :typeDetails!=null?
                    <div id="PokeType" className="screen">
                        <div className="heading">{type[0].toUpperCase() + type.slice(1)} {typeDetails!=null?<font className="ID"> #{String(typeDetails.id).padStart(4, '0')} ({typeDetails.move_damage_class.name})</font>:null}</div>
                        <div style={{width:"95%"}}>
                            {typeDetails.damage_relations!=null?<>
                                <div className="Stat">
                                    <div className="StatName">Double Damage From : </div>
                                    <div className="StatRes">
                                        {typeDetails.damage_relations.double_damage_from.map(type=>(
                                            <div className="resListItem" onClick={()=>navigate(`/type/${type.name}`)} style={{backgroundColor:"rgb(250,140,110)"}} key={type.name}>{type.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="Stat">
                                    <div className="StatName">Double Damage To : </div>
                                    <div className="StatRes">
                                        {typeDetails.damage_relations.double_damage_to.map(type=>(
                                            <div className="resListItem" onClick={()=>navigate(`/type/${type.name}`)} style={{backgroundColor:"rgb(100,200,100)"}} key={type.name}>{type.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </>:null}
                            <div className="Stat">
                                <div className="StatName">Moves : </div>
                                <div className="StatRes">
                                    {typeDetails.moves!=null||typeDetails.moves.length!==0?typeDetails.moves.map(type=>(
                                        <div className="resListItem" onClick={()=>navigate(`/move/${type.name}`)} style={{backgroundColor:"rgb(200,200,100)"}} key={type.name}>{type.name}</div>
                                    )):null}
                                </div>
                            </div>
                        </div>
                        <div className="StatName heading">Pokemons</div>
                        <div className="pokemons">
                            {typeDetails.pokemon.length !== 0 ?
                                typeDetails.pokemon.slice(0,10).map(result => (
                                    <ResultCard key={result.pokemon.url} info={result.pokemon} />
                            )):null}
                        </div>
                    </div>:<div className="noRes screen"><img src={loading} alt="loading"/></div>:
                    <div className="noRes screen">
                        <img src={sadpokemon} alt='sadPokemon' className="noResImage" />
                        <div className="noResText">Something Went Wrong...</div>
                    </div>}
        </>
    )
}