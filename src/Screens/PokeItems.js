import "./PokeItems.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sadpokemon from "../Resources/sadpokemon.png";
import sadpokemon2 from "../Resources/sadpokemon2.png";
import loading from "../Resources/loading.gif";
import ResultCard from "../Components/ResultCard";
import pokedex from "../Resources/pokedex.png";

export default function PokeItems(){
    let {item} = useParams();
    const [itemDetails,setItemDetails] = useState(null);
    const [fetchError,setFetchError] = useState(false);

    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/item/${item.toLowerCase()}`,{
            method:"GET"
        }).then( result=>{
            if(result.status===200)
                result.text().then(res=>setItemDetails(JSON.parse(res)))
            else
                result.text().then(()=>setItemDetails("Not Found"))
        }).catch(()=>setFetchError(true))
},[item])
    return(
        <>
            {!fetchError?itemDetails==="Not Found"?
                <div className="noRes screen">
                    <img src={sadpokemon2} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Item Not Found...</div>
                </div>
                :itemDetails!=null?<div id="PokeItem" className="screen">
                <div className="heading">{item[0].toUpperCase() + item.slice(1)} {itemDetails!=null?<font className="ID"> #{String(itemDetails.id).padStart(4, '0')} ({itemDetails.category.name})</font>:null}</div>
                    <div className="pokeItem">
                        
                        <div className="Stats">
                            {itemDetails.effect_entries.filter(entry=>entry.language.name==='en').length!==0?<div className="desc">{itemDetails.effect_entries.filter(entry=>entry.language.name==='en')[0].effect}</div>:null}
                            {itemDetails.category!=null?<div className="Stat">
                                <div className="StatName">Category : </div>
                                <div className="StatRes">
                                    {itemDetails.category.name}
                                </div>
                            </div>:null}
                            {itemDetails.cost!=null?<div className="Stat">
                                <div className="StatName">Cost : </div>
                                <div className="StatRes">
                                    {itemDetails.cost}
                                </div>
                            </div>:null}
                            {itemDetails.fling_power!=null?<div className="Stat">
                                <div className="StatName">Fling Power: </div>
                                <div className="StatRes">
                                    {itemDetails.fling_power}
                                </div>
                            </div>:null}
                            {itemDetails.fling_effect!=null?<div className="Stat">
                                <div className="StatName">Fling Effect : </div>
                                <div className="StatRes">
                                    {itemDetails.fling_effect.name}
                                </div>
                            </div>:null}
                        </div>
                        <div className="pokedexContainer">
                            <img className="pokedexDisplay" src={itemDetails.sprites.default} alt="pokemon"/> 
                            <img src={pokedex} alt="pokedex" className="pokedex"/>
                            <div className="pokedexName pokeDisplayText">{item[0].toUpperCase() + item.slice(1)}</div>
                            <div className="pokeWeight pokeDisplayText">{itemDetails.fling_power}</div><div className="pokeHeight pokeDisplayText">{itemDetails.cost}</div>
                            <div className="pokeType pokeDisplayText">{itemDetails.category.name[0].toUpperCase() + itemDetails.category.name.slice(1)}</div>
                        </div>
                    </div>
                    <div className="StatName heading">Pokemons</div>
                    <div className="pokemons">
                        {itemDetails.held_by_pokemon.length !== 0 ?
                            itemDetails.held_by_pokemon.slice(0,10).map(result => (
                                <ResultCard key={result.pokemon.url} info={result.pokemon} />
                        )):null}
                    </div>
                </div>
                :<div className="noRes screen"><img src={loading} alt="loading"/></div>:
                    <div className="noRes screen">
                        <img src={sadpokemon} alt='sadPokemon' className="noResImage" />
                        <div className="noResText">Something Went Wrong...</div>
                    </div>}
        </>
    )
}