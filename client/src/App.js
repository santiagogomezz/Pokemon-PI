import './App.css';
import { Route, Switch} from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate.jsx';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" component={LandingPage}/>
        <Route exact path = "/home" component={Home}/>
        <Route  path = "/pokemons" component={PokemonCreate}/>
        <Route  path = "/home/:id" component={Detail}/>
      </Switch>
    </div>
  );
}

export default App;
