import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //useHistory
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Reset from './components/ResetPassword/Reset';
// import axios from 'axios';
// import AuthContext from './components/Auth/AuthContext';
// import { useContext } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Verify from './components/Verification/Verify';


const Routes = () => {
	// const history = useHistory();

	// const { getLoggedIn, loggedIn } = useContext(AuthContext);

	// async function handleLogOut() {
	// 	await axios.get('https://api.apexwallet.app/api/v1/auth/logout');
	// 	await getLoggedIn();
	// 	history.push('/login');
	// }

	return (
		<Router>
			<Switch>
				<Route exact path="/dashboard">
					<Dashboard />
				</Route>

				<Route exact path="/signup">
					<SignUp />
				</Route>

				<Route exact path="/login">
					<Login />
				</Route>

				<Route exact path="/forgot-password">
					<ForgotPassword />
				</Route>

				<Route path="/reset">
					<Reset />
				</Route>

				<Route path="/verify">
					<Verify />
				</Route>

				<Route exact path="/">
					<div className="App">
						<Home />
					</div>
				</Route>

				<Route path="*">
					<h1 style={{ color: '#fff', textAlign: 'center' }}>PAGE NOT FOUND</h1>
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
