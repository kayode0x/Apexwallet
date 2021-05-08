import './SignUp.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useContext } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthContext from '../Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
	const history = useHistory();
	const { getLoggedIn } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [username, seUserName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [signingIn, setSigningIn] = useState(false);

	//handle the signup request from the form 
	const handleSignUp = async (e) => {
		e.preventDefault();

		//animate the button with this state
		setSigningIn(true);

		//send a post request to the server
		try {
			const user = { username, email, password };

			//honestly, axios makes life easier.
			await axios
				.post('http://192.168.1.98:9000/api/v1/auth/signup', user,
					{headers: {
						// Overwrite Axios's automatically set Content-Type
						'Content-Type': 'application/json',
					}}
				)
				// OKAY THIS SH*T WORKS 🚀
				.then(
					//Using axios, check the res response and look for the status
					(res) => {
						async function getStatus(){
							//wait to see if the status exists
							await res.status;
							//if the status is 201 (created), then refresh the getLoggedIn()
							//so the loggedIn value can change from false to true in the AuthContext
							if (res.status === 201) {
								await getLoggedIn();
								await history.push('/dashboard');
							}
						}
						//call the function.
						getStatus();
					}
				)
				//if there is an error from the server, display it
				.catch(async (err) => {
					//toastify ROCKS!!
					await toast.dark(`${err.response.data.message}`, {
						position: toast.POSITION.TOP_CENTER,
					});
				});
			setSigningIn(false);
		} catch (error) {
			console.log('ERROR: ' + error.response);
			setSigningIn(false);
		}
	};

	//toggle the password visibility
	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<HelmetProvider>
			<div className="signup">
				<Helmet>
					<title>Signup - Apex</title>
				</Helmet>
				<div className="container">
					<div className="header">Sign Up</div>

					<div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div>

					<form onSubmit={handleSignUp}>
						<div className="name">
							<label htmlFor="name">Username</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="johndoe99"
								minLength="2"
								required
								value={username}
								onChange={(e) => seUserName(e.target.value)}
							/>
						</div>

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
								minLength="6"
								name="password"
								placeholder="Chose a strong password"
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

						<button disabled={signingIn ? true : false} type="submit">
							{signingIn ? <RotateSpinner size={30} color="#fff" /> : 'Create Account'}
						</button>
					</form>

					<Link to="/login" className="oldUser">
						Got an account? <span>Login</span> instead
					</Link>
				</div>
			</div>
			
			{/* {DON'T FORGET THE TOAST CONTAINER } */}
			<ToastContainer />
		</HelmetProvider>
	);
};

export default SignUp;
