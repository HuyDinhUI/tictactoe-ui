import logo from './logo.svg';
import './App.css';
import Game from './component/Game'
import {Route,Routes,BrowserRouter as Router, Link, NavLink} from 'react-router-dom';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom'
import HomePage from './component/Home';
import Human from './component/Human';
import Challenge from './component/Challenge';
import About from './component/aboutme';
import ModePage from './component/Mode';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Game" element={<Game/>} />
        <Route path='/Human' element={<Human/>}></Route>
        <Route path='/Challenge' element={<Challenge></Challenge>}></Route>
        <Route path='/About' element={<About></About>}></Route>
        <Route path='/Mode' element={<ModePage></ModePage>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
