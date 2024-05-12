import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import PokeSearch from './Screens/PokeSearch';
import PokeDetails from './Screens/PokeDetails';
import Nav from './Components/Nav';
import WebFont from 'webfontloader';
import PokeHome from './Screens/PokeHome';
import PokeType from './Screens/PokeType';
import PokeMoves from './Screens/PokeMoves';
import PokeItems from './Screens/PokeItems';
import PokeAbility from './Screens/PokeAbility';

function App() {
  WebFont.load({
    google: {
      families: ["Pixelify Sans","Roboto Condensed"]
    }
});
  return (
    <div className="App">
      <div className='background'/>
      <Nav/>
      <Routes>
        <Route path='' element={<PokeHome/>} />
        <Route path='search' element={<PokeSearch/>} />
        <Route path="pokemon">
          <Route path='' element={<Navigate to="/search"/>}/>
          <Route path=':pokename' element={<PokeDetails/>}/>
        </Route>
        <Route path="type">
          <Route path='' element={<Navigate to="/search"/>}/>
          <Route path=':type' element={<PokeType/>}/>
        </Route>
        <Route path="move">
          <Route path='' element={<Navigate to="/search"/>}/>
          <Route path=':move' element={<PokeMoves/>}/>
        </Route>
        <Route path="item">
          <Route path='' element={<Navigate to="/search"/>}/>
          <Route path=':item' element={<PokeItems/>}/>
        </Route>
        <Route path="ability">
          <Route path='' element={<Navigate to="/search"/>}/>
          <Route path=':ability' element={<PokeAbility/>}/>
        </Route>
        <Route path='*' element={<Navigate to="/"/>} />
      </Routes>
    </div>
  );
}

export default App;
