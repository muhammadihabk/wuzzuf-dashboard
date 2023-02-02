import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Company } from './pages/Company';
import { NoAuth } from './pages/NoAuth';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/company' element={<NoAuth/>}>
              <Route exact path='/company/:companyName' element={<Company/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
