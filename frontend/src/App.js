import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
     <h1>Parks & Rec</h1>
     <Button variant="outline-info">Info</Button>{' '}
    </div>
  );
}

export default App;
