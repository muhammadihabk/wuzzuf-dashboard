import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { NoAuth } from './pages/NoAuth';
import { Company } from './pages/Company';
import { Skill } from './pages/Skill';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/company' element={<NoAuth/>}>
              <Route exact path='/company/:companyName' element={<Company/>}/>
          </Route>
          <Route exact path='/skill' element={<NoAuth/>}>
              <Route exact path='/skill/:skillName' element={<Skill/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
