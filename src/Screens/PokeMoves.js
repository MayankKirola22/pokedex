import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sadpokemon from "../Resources/sadpokemon.png";
import sadpokemon2 from "../Resources/sadpokemon2.png";
import loading from "../Resources/loading.gif";
import ResultCard from "../Components/ResultCard";

export default function PokeMoves(){
    let {move} = useParams();
    const [moveDetails,setMoveDetails] = useState(null);
    const [fetchError,setFetchError] = useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
            fetch(`https://pokeapi.co/api/v2/move/${move.toLowerCase()}`,{
                method:"GET"
            }).then( result=>{
                if(result.status===200)
                    result.text().then(res=>setMoveDetails(JSON.parse(res)))
                else
                    result.text().then(()=>setMoveDetails("Not Found"))
            }).catch(()=>setFetchError(true))
    },[move])
    return(
        <>
            {!fetchError?moveDetails==="Not Found"?
                <div className="noRes screen">
                    <img src={sadpokemon2} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Move Not Found...</div>
                </div>
                :moveDetails!=null?<div id="PokeMove" className="screen">
                    <div className="heading">{move[0].toUpperCase() + move.slice(1)} {moveDetails!=null?<font className="ID"> #{String(moveDetails.id).padStart(4, '0')} ({moveDetails.damage_class.name})</font>:null}</div>
                    {moveDetails.effect_entries.filter(entry=>entry.language.name==='en').length!==0?<div className="desc" style={{paddingLeft:'40px'}}>{moveDetails.effect_entries.filter(entry=>entry.language.name==='en')[0].effect}</div>:null}
                    <div className="Stats" style={{margin:"0px 40px"}}>
                       {moveDetails.accuracy!=null?<div className="Stat">
                            <div className="StatName">Accuracy : </div>
                            <div className="StatRes">{moveDetails.accuracy}</div>
                        </div>:null}
                        {moveDetails.power!=null?<div className="Stat">
                            <div className="StatName">Power : </div>
                            <div className="StatRes">{moveDetails.power}</div>
                        </div>:null}
                        {moveDetails.pp!=null?<div className="Stat">
                            <div className="StatName">Pp : </div>
                            <div className="StatRes">{moveDetails.pp}</div>
                        </div>:null}
                        {moveDetails.priority!=null?<div className="Stat">
                            <div className="StatName">Priority : </div>
                            <div className="StatRes">{moveDetails.priority}</div>
                        </div>:null}
                        {moveDetails.type!=null?<div className="Stat">
                            <div className="StatName">Type : </div>
                            <div className="StatRes"><div className="resListItem" style={{backgroundColor:"rgb(105,250,200)"}} onClick={()=>navigate(`/type/${moveDetails.type.name}`)} >{moveDetails.type.name}</div></div>
                        </div>:null}
                        {moveDetails.contest_combos!==null?
                        <>
                            <div className="Stat withSubStat">
                                <div className="StatName">Normal combos : </div>
                                <div className="subStat">
                                    <div className="StatName">use Before : </div>
                                    <div className="StatRes">
                                        {moveDetails.contest_combos.normal.use_before!==null?moveDetails.contest_combos.normal.use_before.map(result=>(
                                                <div className="resListItem" onClick={()=>navigate(`/move/${result.name}`)} style={{backgroundColor:"rgb(105,250,200)"}} key={result.name}>{result.name}</div>
                                        )):<>none</>}
                                    </div>
                                </div>
                                <div className="subStat">
                                    <div className="StatName">use After : </div>
                                    <div className="StatRes">
                                        {moveDetails.contest_combos.normal.use_after!==null?moveDetails.contest_combos.normal.use_after.map(result=>(
                                                <div className="resListItem" onClick={()=>navigate(`/move/${result.name}`)} style={{backgroundColor:"rgb(105,250,200)"}} key={result.name}>{result.name}</div>
                                        )):<>none</>}
                                    </div>
                                </div>
                            </div>
                            <div className="Stat withSubStat">
                                <div className="StatName">Super combos : </div>
                                <div className="subStat">
                                    <div className="StatName">use Before : </div>
                                    <div className="StatRes">
                                        {moveDetails.contest_combos.super.use_before!==null?moveDetails.contest_combos.super.use_before.map(result=>(
                                                <div className="resListItem" onClick={()=>navigate(`/move/${result.name}`)} style={{backgroundColor:"rgb(105,250,200)"}} key={result.name}>{result.name}</div>
                                        )):<>none</>}
                                    </div>
                                </div>
                                <div className="subStat">
                                    <div className="StatName">use After : </div>
                                    <div className="StatRes">
                                        {moveDetails.contest_combos.super.use_after!==null?moveDetails.contest_combos.super.use_after.map(result=>(
                                                <div className="resListItem" onClick={()=>navigate(`/move/${result.name}`)} style={{backgroundColor:"rgb(105,250,200)"}} key={result.name}>{result.name}</div>
                                        )):<>none</>}
                                    </div>
                                </div>
                            </div>
                        </>
                    :null}
                    </div>
                    <div className="StatName heading">Pokemons</div>
                        <div className="pokemons">
                            {moveDetails.learned_by_pokemon.length !== 0 ?
                                moveDetails.learned_by_pokemon.slice(0,10).map(result => (
                                    <ResultCard key={result.url} info={result} />
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