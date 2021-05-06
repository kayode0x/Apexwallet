import './Login.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		setLoggingIn(true);
		const user = { email, password };
		console.log(JSON.stringify(user));
		setEmail('');
		setPassword('');

		setTimeout(() => {
			setLoggingIn(false);
		}, 3000);
	};

	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};
	return (
		<HelmetProvider>
			<div className="login">
				<Helmet>
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
		</HelmetProvider>
	);
};

export default Login;
