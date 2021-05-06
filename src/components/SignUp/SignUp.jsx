import './SignUp.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [signingIn, setSigningIn] = useState(false);

	const handleSignUp = (e) => {
		e.preventDefault();
        setSigningIn(true);
		const user = { name, email, password };
		console.log(JSON.stringify(user));
		setEmail('');
		setName('');
		setPassword('');

        setTimeout(() => {
            setSigningIn(false);
        }, 3000)
	};

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
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="John Doe"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
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
		</HelmetProvider>
	);
};

export default SignUp;
