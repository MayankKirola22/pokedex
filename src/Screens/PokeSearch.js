import ResultCard from "../Components/ResultCard";
import "./PokeSearch.css";
import { useEffect, useState } from "react";
import sadcyduck from "../Resources/sadcyduck.png";
import happyPikachu from "../Resources/happyPikachu.png"
import sadpokemon from "../Resources/sadpokemon.png"
export default function PokeSearch() {
    const [AllPokemons, setAllPokemons] = useState(null);
    const [pokeResults, setPokeResults] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [fetchError,setFetchError] = useState(false);
    const handleSearch = () =>{
        if(searchString==='')
            setPokeResults(null);
        else{
            let regex = new RegExp(`^[a-z]*${searchString}[a-z]*$`,'i');
            setPokeResults(AllPokemons.results.filter(result=>regex.test(result.name)))
        }
        console.log(pokeResults)
    }
    useEffect(()=>{
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000",{
            method:"GET"
        }).then(result=>result.text().then(res=>setAllPokemons(JSON.parse(res)))).catch(()=>setFetchError(true))
    },[])
    return (
        <>
        {!fetchError?
            <div id="PokeSearch" className="screen">
                <div className="heading">Poké-Search</div>
                <div className="searchContainer"><input placeholder="Pikachu" id='searchResult' onChange={e=>setSearchString(e.target.value)} className="input" /><div className="button" onClick={handleSearch}>Search</div></div>
                <div className="heading">Results</div>
                <div className="separator" />
                <div className="resultSection">
                    {pokeResults==null?
                        <div className="noRes">
                            <img src={happyPikachu} alt='happyPokemon' className="noResImage" />
                            <div className="noResText">Search Something...</div>
                        </div>:
                        pokeResults.length !== 0 ?
                            pokeResults.map(result => (
                                <ResultCard key={result.url} info={result} />
                        )):
                        <div className="noRes">
                            <img src={sadcyduck} alt='sadPokemon' className="noResImage" />
                            <div className="noResText">No Result Found...</div>
                        </div>
                    }
                </div>
            </div>:
            <div className="noRes screen">
                <img src={sadpokemon} alt='sadPokemon' className="noResImage" />
                <div className="noResText">Something Went Wrong...</div>
            </div>}
        </>
    )
}