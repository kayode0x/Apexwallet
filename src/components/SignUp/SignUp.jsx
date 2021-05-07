import './SignUp.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useContext } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthContext from '../Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [username, seUserName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [signingIn, setSigningIn] = useState(false);

	const handleSignUp = async (e) => {
		e.preventDefault();
        setSigningIn(true);
		

		try {
			const user = { username, email, password };
			await axios
				.post('http://192.168.1.98:9000/api/v1/auth/signup', user)
				.catch(async (err) => {
					await toast.dark(`${err.response.data.message}`, {
						position: toast.POSITION.TOP_CENTER,
					});
				});
			setSigningIn(false);
			await getLoggedIn();
		} catch (error) {
			console.log("ERROR" + error.response);
			setSigningIn(false);
		}
	};

	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<HelmetProvider>
			{loggedIn === false && (
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
			)}
			<ToastContainer />
		</HelmetProvider>
	);
};

export default SignUp;
