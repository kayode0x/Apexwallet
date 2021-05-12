import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //useHistory
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Reset from './pages/ResetPassword/Reset';
import './App.css';
import Dashboard from './pages/Portfolio/Dashboard/Dashboard';
import Verify from './pages/Verification/Verify';
import Wallet from './pages/Portfolio/Wallet/Wallet';
import Market from './pages/Portfolio/Market/Market';


const Routes = () => {

	return (
		<Router>
			<Switch>
				<Route exact path="/dashboard">
					<Dashboard />
				</Route>
				<Route exact path="/wallet">
					<Wallet />
				</Route>
				<Route exact path="/market">
					<Market />
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
						<LandingPage />
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
