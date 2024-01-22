import './App.css';
import React from 'react';
import { Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './pages/Home/Home.jsx';
import DetailPage from './pages/Details/Details.jsx';
import Createpage from './pages/Create/Create.jsx';
import NavBar from './components/NavBar/NavBar.jsx';


function App() {
  return (
    <div className="App">
      <Route path = "/"><NavBar/></Route>
      <Route exact path="/"><LandingPage/></Route>
      <Route exact path="/home"><Home/></Route>
      <Route exact path="/dog/:id" component={DetailPage}/>
      <Route exact path="/dogs/create" component={Createpage}/>
    </div>
  );
}

export default App;
