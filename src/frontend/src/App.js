import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <div className='nav-bar'>
        <nav><a href='/'><h1>Wuzzuf Dashboard</h1></a></nav>
      </div>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to="/home" />}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/'>
              <Route path='company/:filter' element={<Home/>}/>
              <Route path='skill/:filter' element={<Home/>}/>
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
