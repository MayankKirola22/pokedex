import "./PokeDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pokedex from "../Resources/pokedex.png";
import AudioButton from "../Components/AudioButton";
import sadpokemon from "../Resources/sadpokemon.png";
import sadpokemon2 from "../Resources/sadpokemon2.png";
import loading from "../Resources/loading.gif";

export default function PokeDetails(){
    const [pokeDetails,setPokeDetails] = useState(null);
    const [fetchError,setFetchError] = useState(false);
    let {pokename} = useParams();
    const navigate=useNavigate();
    useEffect(()=>{
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokename.toLowerCase()}`,{
                method:"GET"
            }).then( result=>{
                if(result.status===200)
                    result.text().then(res=>setPokeDetails(JSON.parse(res)))
                else
                    result.text().then(()=>setPokeDetails("Not Found"))
            }).catch(()=>setFetchError(true))
    },[pokename])
    
    return(
        <>
            {!fetchError?pokeDetails==="Not Found"?
                <div className="noRes screen">
                    <img src={sadpokemon2} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Pokemon Not Found...</div>
                </div>:pokeDetails!=null?
                    <div id="PokeDetails" className="screen">
                        <div className="heading">{pokename[0].toUpperCase() + pokename.slice(1)} {pokeDetails!=null?<font className="ID"> #{String(pokeDetails.order).padStart(4, '0')}</font>:null}</div>
                        <div className="pokedetails">
                            <div className="Stats">
                                {pokeDetails.types.length!==0?<div className="Stat">
                                    <div className="StatName">Type : </div>
                                    <div className="StatRes">
                                        {pokeDetails.types.map(type=>(
                                            <div className="resListItem" onClick={()=>navigate(`/type/${type.type.name}`)} style={{backgroundColor:"rgb(200,200,200)"}} key={type.type.name}>{type.type.name}</div>
                                        ))}
                                    </div>
                                </div>:null}
                                {pokeDetails.height!=null?<div className="Stat">
                                    <div className="StatName">Height : </div>
                                    <div className="StatRes">
                                        {(Math.round(((pokeDetails.height*10)*0.3937)/12))} feet {(Math.round(((pokeDetails.height*10)*0.3937)%12))} inches
                                    </div>
                                </div>:null}
                                {pokeDetails.weight!=null?<div className="Stat">
                                    <div className="StatName">Weight : </div>
                                    <div className="StatRes">
                                        {pokeDetails.weight/10} kg
                                    </div>
                                </div>:null}
                                <div className="Stat">
                                    <div className="StatName">Abilities : </div>
                                    <div className="StatRes">
                                        {pokeDetails.abilities.length!==0?pokeDetails.abilities.map(ability=>(
                                            <div className="resListItem" onClick={()=>navigate(`/ability/${ability.ability.name}`)} style={{backgroundColor:"rgb(255,150,100)"}} key={ability.ability.name}>{ability.ability.name}</div>
                                        )):"none"}
                                    </div>
                                </div>
                                <div className="Stat">
                                    <div className="StatName">Cries : </div>
                                    <div className="StatRes">
                                        {pokeDetails.cries.legacy!=null?<AudioButton link={pokeDetails.cries.legacy} text='Legacy'/>:null}
                                        {pokeDetails.cries.latest!=null?<AudioButton link={pokeDetails.cries.latest} text='Latest'/>:null}
                                        {pokeDetails.cries.latest==null && pokeDetails.cries.legacy==null?"none":null}
                                    </div>
                                </div>
                                {pokeDetails.base_experience!=null?<div className="Stat">
                                    <div className="StatName">Base Experience : </div>
                                    <div className="StatRes">
                                        {pokeDetails.base_experience}
                                    </div>
                                </div>:null}
                                <div className="Stat">
                                    <div className="StatName">Held items : </div>
                                    <div className="StatRes">
                                        {pokeDetails.held_items.length!==0?pokeDetails.held_items.map(item=>(
                                                <div className="resListItem" onClick={()=>navigate(`/item/${item.item.name}`)} style={{backgroundColor:"rgb(105,250,200)"}} key={item.item.name}>{item.item.name}</div>
                                        )):<>none</>}
                                    </div>
                                </div>
                            </div>
                            <div className="pokedexContainer">
                                <img className="pokedexDisplay" src={pokeDetails.sprites.front_default} alt="pokemon"/> 
                                <img src={pokedex} alt="pokedex" className="pokedex"/>
                                <div className="pokedexName pokeDisplayText">{pokename[0].toUpperCase() + pokename.slice(1)}</div>
                                <div className="pokeWeight pokeDisplayText">{pokeDetails.weight/10}kg</div><div className="pokeHeight pokeDisplayText">{(Math.round(((pokeDetails.height*10)*0.3937)/12))}' {(Math.round(((pokeDetails.height*10)*0.3937)%12))}''</div>
                                <div className="pokeType pokeDisplayText">{pokeDetails.types[0].type.name[0].toUpperCase() + pokeDetails.types[0].type.name.slice(1)}</div>
                            </div>
                        </div>
                        <div className="Stat" style={{flexDirection:"column"}}>
                                    <div className="StatName">Stats: </div>
                                    <div className="StatRes" style={{flexWrap:'wrap',gap:'40px',padding:'20px'}}>
                                        {pokeDetails.stats.map(stat=>(
                                                <div className="resListItem" style={{backgroundColor:"rgb(155,255,155)"}} key={stat.stat.name}><div className="pokeStatName" >{stat.stat.name}</div> : {stat.base_stat}</div>
                                            ))}
                                    </div>
                                </div>
                                <div className="Stat" style={{flexDirection:'column'}}>
                                    <div className="StatName" style={{paddingBottom:'20px'}}>Moves : </div>
                                    <div className="StatRes">
                                        {pokeDetails.moves.map(result=>(
                                            <div className="resListItem" onClick={()=>navigate(`/move/${result.move.name}`)} style={{backgroundColor:"rgb(200,200,100)"}} key={result.move.name}>{result.move.name}</div>
                                        ))}
                                    </div>
                                </div>
                </div>:<div className="noRes screen"><img src={loading} alt="loading"/></div>:
                <div className="noRes screen">
                    <img src={sadpokemon} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Something Went Wrong...</div>
                </div>}
            </>
    )
}