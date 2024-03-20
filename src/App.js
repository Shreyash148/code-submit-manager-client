import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Page1 from './pages/page1';
import Page2 from './pages/page2';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Page1/>}/>
        <Route exact path='/page2' element={<Page2/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
