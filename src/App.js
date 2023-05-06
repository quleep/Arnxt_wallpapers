import logo from './logo.svg';
import './App.css';
import Login from './Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Wallpapers from './Wallpapers';
import Camera from './Camera';

function App() {
  return (
    <div className="App">

    
       
      <Router>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/wallpapers" component={Wallpapers} />
        <Route exact path="/camera" component={Camera} />
     


        


          

        </Switch>
      </Router>
      

    
    </div>
  );
}

export default App;
