import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <div className='nav-bar'>
        <nav><a href='/' className='page-logo'>Wuzzuf Dashboard</a></nav>
      </div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}>
              <Route path='company/:filter' element={<Home/>}/>
              <Route path='skill/:filter' element={<Home/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
