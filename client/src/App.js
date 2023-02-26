import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateGame from './components/CreateGame/CreateGame';
import About from './components/About/About';
import axios from 'axios';

axios.defaults.baseURL = 'https://pi-videogames-production-c478.up.railway.app/';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route path='/home' component={Home} />
					<Route path='/about' component={About} />
					<Route path='/detail/:id' component={Detail} />
					<Route path='/creategame' component={CreateGame} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
