import './App.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';


function App() {
  const matches = useMediaQuery('(max-width:1023px)');
  
  return (
		<Router>
			<Switch>
				<Route path="/">
					<div className="App">
						<Home />
					</div>
				</Route>
			</Switch>
		</Router>
  );
}

export default App;
