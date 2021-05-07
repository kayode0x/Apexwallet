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


const Routes = () => {
	// const history = useHistory();

	// const { getLoggedIn, loggedIn } = useContext(AuthContext);

	// async function handleLogOut() {
	// 	await axios.get('http://localhost:9000/api/v1/auth/logout');
	// 	await getLoggedIn();
	// 	history.push('/login');
	// }

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
};

export default Routes;
