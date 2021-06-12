import './Login.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthContext from '../../components/Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	//handle the form submit
	const handleLogin = async (e) => {
		e.preventDefault();

		//start animating the button
		setLoggingIn(true);

		//use try catch to prevent open hole
		try {
			const user = { email, password };
			await axios
				.post(`${apiURL}/auth/login`, user, { withCredentials: true })
				.then((res) => {
					async function getStatus() {
						//wait to see if the status exists
						await res.status;
						//if the status is 201 (created), then refresh the getLoggedIn()
						//so the loggedIn value can change from false to true in the AuthContext
						if (res.status === 200) {
							await getLoggedIn();
							await history.push('/dashboard');
						}
					}
					//call the function.
					getStatus();
				})
				.catch(async (err) => {
					//if error, display the custom error message from the server with toastify.
					await toast.error(`${err.response.data}`, {});
				});

			//after the try operation, stop the button animation
			setLoggingIn(false);
		} catch (error) {
			console.log('ERROR' + error);
			setLoggingIn(false);
		}
	};

	//toggle the password visibility
	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<HelmetProvider>
			<div className="login">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Login - Apex</title>
				</Helmet>
				<div className="container">
					<div className="header">Welcome Back</div>

					<div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div>

					<form onSubmit={handleLogin}>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="johndoe@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								type={passwordVisible ? 'text' : 'password'}
								id="password"
								name="password"
								placeholder="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="eyeIcons">
								{passwordVisible ? (
									<BsEyeSlashFill onClick={togglePassword} />
								) : (
									<BsEyeFill onClick={togglePassword} />
								)}
							</div>
						</div>

						<button disabled={loggingIn ? true : false} type="submit">
							{loggingIn ? <RotateSpinner size={30} color="#fff" /> : 'Login'}
						</button>
					</form>

					<Link to="/forgot-password" className="forgotPass">
						Forgot password?
					</Link>
					<Link to="/signup" className="newUser">
						New user? <span>Sign Up here 🚀</span>
					</Link>
				</div>
			</div>

			<ToastContainer hideProgressBar autoClose={3000} />
		</HelmetProvider>
	);
};

export default Login;
