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
  
  useHistory,
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
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Viewar from './Viewar';
import ViewarDetails from './ViewarDetails';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import View from './View';

const verifytoken= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/verifytoken'


function App() {

 const history = useHistory()
  useEffect(()=>{

  /*
    const user= sessionStorage.getItem('user')
    

    
     const tokenid= JSON.parse(user)
    const tokenvalue= tokenid.token
  

    const body={
      loginid : tokenid.data.userID,
      token : tokenid.token
    }

    axios.post(verifytoken, body).then(res=>{
       if(res.data.message === 'verified'){
        console.log('hellow')
       } else{
        history.push('/')
       }
    }).catch(error=>{
      console.log(error)
    })

    

    */


  },[])

  
  const TRACKING_ID = "UA-217190843-1"; 
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


 

    

  return (
    <div className="App">

    
       
      <Router>
      <Helmet>
            <title>Login | ARnxt</title>
            <meta
              name="description"
              content="India’s first Augmented reality market place where the company’s stand-out feature is its DIY(Do-It-Yourself) features."
            />
            <meta
              name="keywords"
              content="
          
          Augmented Reality, Augmented Reality in India, Augmented Reality Technology, Augmented reality product, Augmented reality app, Augmented reality apps, Augmented reality product for business, Augmented reality products for business, Augmented reality product for businesses, Augmented reality products for businesses, Augmented reality apps for android, Augmented reality app for android, Augmented reality apps for ios, Augmented reality app for ios, Augmented reality market place, Metaverse, metaverse technologies, ar technology, AR Technology, AR Technology in India, augmented realty app in India, Augmented Reality Technology App, Augmented Reality Technology App in India, augmented reality, metaverse technologies, metaverse technology, experiential commerce platform, Virtual Realty, Virtual Technology, Festive Metaverse Universe
           "
            />
          </Helmet>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/walls" component={Wall} />
        <Route exact path="/camera" component={Camera} />
        <Route exact path="/home" component={Brand} />
        <Route exact path="/products" component={Wallpaper} />
        <Route exact path="/wallarts" component={Wallpapers} />
        <Route exact path="/details" component={ViewarDetails} />


        <Route exact path="/WallMurals" component={WallMurals} />
        <Route exact path="/view3d" component={Viewar} />

        <Route exact path="/floor" component={Floors} />

        <Route exact path="/view" component={ChangeWalls} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/room" component={Rooms} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/productdetails" component={ProductDetails} />
        <Route exact path="/arview" component={View} />




        </Switch>
      </Router>
      

    
    </div>
  );
}

export default App;
