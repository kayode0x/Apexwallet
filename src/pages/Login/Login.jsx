import './Login.scss';
// import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useTitle from '../../utils/useTitle';
import AuthContext from '../../components/Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const apiURL = 'https://api.apexwallet.app/v1';

	useTitle('Login | Apexwallet');

	//handle the form submit
	const handleLogin = async (e) => {
		e.preventDefault();

		//start animating the button
		setLoggingIn(true);

		//use try catch to prevent open hole
		try {
			const user = { username, password };
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
		<>
			<div className="login">
				<div className="container">
					<div className="header">
						<p>Welcome Back!</p>
						<span>Sign in to continue</span>
					</div>

					{/* <div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div> */}

					<form onSubmit={handleLogin}>
						<div className="username">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								id="username"
								name="username"
								placeholder="johndoe99"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
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

							<Link to="/forgot-password" className="forgotPass">
								Forgot Password?
							</Link>
						</div>

						<button disabled={loggingIn ? true : false} type="submit">
							{loggingIn ? <RotateSpinner size={30} color="#fff" /> : 'Login'}
						</button>
					</form>
					<Link to="/signup" className="newUser">
						Don't have an account? - <span>Sign Up</span>
					</Link>
				</div>
			</div>

			<ToastContainer hideProgressBar autoClose={3000} />
		</>
	);
};

export default Login;
