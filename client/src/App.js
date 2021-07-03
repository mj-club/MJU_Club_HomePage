import logo from './logo.svg';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './routes/Login';
import Home from './routes/Home';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee)

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default App;
