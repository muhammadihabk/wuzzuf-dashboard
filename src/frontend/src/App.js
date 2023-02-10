import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { NoAuth } from './pages/NoAuth';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <div className='nav-bar'>
        <nav><a href='/home'><h1>Wuzzuf Dashboard</h1></a></nav>
      </div>
        <Router>
          <Routes>
            <Route exact path='/home' element={<NoAuth/>}>
                <Route exact path='/home' element={<Home/>}/>
            </Route>
            <Route exact path='/company' element={<NoAuth/>}>
                <Route exact path='/company/:filter' element={<Home/>}/>
            </Route>
            <Route exact path='/skill' element={<NoAuth/>}>
                <Route exact path='/skill:filter' element={<Home/>}/>
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
