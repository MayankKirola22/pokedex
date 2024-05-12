import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import sadpokemon from "../Resources/sadpokemon.png";
import sadpokemon2 from "../Resources/sadpokemon2.png";
import loading from "../Resources/loading.gif";
import ResultCard from "../Components/ResultCard";

export default function PokeAbility() {
    const [abilityDetails, setAbilityDetails] = useState(null);
    const [fetchError, setFetchError] = useState(false);
    let { ability } = useParams();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/ability/${ability.toLowerCase()}`, {
            method: "GET"
        }).then(result => {
            if (result.status === 200)
                result.text().then(res => setAbilityDetails(JSON.parse(res)))
            else
                result.text().then(() => setAbilityDetails("Not Found"))
        }).catch(() => setFetchError(true))
    }, [ability])
    return (
        <>
            {!fetchError ? abilityDetails === "Not Found" ?
                <div className="noRes screen">
                    <img src={sadpokemon2} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Ability Not Found...</div>
                </div> : abilityDetails != null ?
                    <div id="AbilityDetails" className="screen">
                        <div className="heading">{ability[0].toUpperCase() + ability.slice(1)} {ability != null ? <font className="ID"> #{String(abilityDetails.id).padStart(4, '0')}</font> : null}</div>
                        <div className="Stats">
                            <div className="desc" style={{ padding: '0px 50px' }}>{abilityDetails.effect_entries.filter(entry => entry.language.name === 'en').length !== 0 ? abilityDetails.effect_entries.filter(entry => entry.language.name === 'en')[0].effect : "No Description"}</div>
                        </div>
                        <div className="StatName heading">Pokemons</div>
                        <div className="pokemons">
                            {abilityDetails.pokemon.length !== 0 ?
                                abilityDetails.pokemon.slice(0, 10).map(result => (
                                    <ResultCard key={result.pokemon.url} info={result.pokemon} />
                                )) : null}
                        </div>
                    </div>
                    : <div className="noRes screen"><img src={loading} alt="loading" /></div> :
                <div className="noRes screen">
                    <img src={sadpokemon} alt='sadPokemon' className="noResImage" />
                    <div className="noResText">Something Went Wrong...</div>
                </div>}
        </>
    )
}