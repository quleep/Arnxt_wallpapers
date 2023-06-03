import logo from './logo.svg';
import './App.css';
import Login from './Login';

import ReactGA from 'react-ga';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Wallpapers from './Wallpapers';
import Camera from './Camera';
import Brand from './Brand';
import Wall from './Wall';
import Wallpaper from './Wallpaper';
import WallMurals from './WallMurals';
import ChangeWalls from './ChangeWalls';
import Test from './Test';
import Rooms from './Rooms';
import Search from './Search';
import Floors from './Floors';
import ProductDetails from './ProductDetails';
import { useEffect } from 'react';



function App() {
  const TRACKING_ID = "UA-217190843-1"; 
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">

    
       
      <Router>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/walls" component={Wall} />
        <Route exact path="/camera" component={Camera} />
        <Route exact path="/home" component={Brand} />
        <Route exact path="/Wallpapers" component={Wallpaper} />
        <Route exact path="/wallarts" component={Wallpapers} />

        <Route exact path="/WallMurals" component={WallMurals} />
        <Route exact path="/floor" component={Floors} />

        <Route exact path="/view" component={ChangeWalls} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/room" component={Rooms} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/productdetails" component={ProductDetails} />



        </Switch>
      </Router>
      

    
    </div>
  );
}

export default App;
