import './ForgotPassword.scss'
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
	const [resetting, setResetting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		setResetting(true);
		const user = { email };
		console.log(JSON.stringify(user));
		setEmail('');

		setTimeout(() => {
			setResetting(false);
            setEmailSent(true);
		}, 3000);
	};

    return (
		<div className="forgotPassword">
			<div className="container">
				<div className="header">{emailSent ? 'Email Sent!' : 'Reset Password'}</div>

				<div className="assets">
					<img src={astronaut} alt="astronaut" />
					<div className="circle"></div>
				</div>

				{emailSent ? (
					<div className="resentTrue">
						A password reset link has been sent to your email address, click the link to continue. 🚀
					</div>
				) : (
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

						<button disabled={resetting ? true : false} type="submit">
							{resetting ? <RotateSpinner size={30} color="#fff" /> : 'Send Link'}
						</button>
					</form>
				)}

				<Link to="/login" className="backToLogin">
					<IoChevronBack/> Back to Login
				</Link>
			</div>
		</div>
	);
}

export default ForgotPassword;