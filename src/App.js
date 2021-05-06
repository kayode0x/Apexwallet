import './App.css';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Reset from './components/ResetPassword/Reset';


function App() {
  // const matches = useMediaQuery('(max-width:1023px)');
  
  return (
		<Router>
			<Switch>
				<Route path="/signup">
					<SignUp />
				</Route>

				<Route path="/login">
					<Login />
				</Route>

				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>

				<Route path="/reset-password">
					<Reset />
				</Route>
        
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
