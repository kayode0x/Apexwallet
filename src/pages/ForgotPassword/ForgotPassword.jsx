import './ForgotPassword.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [resetting, setResetting] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	const handleLogin = async (e) => {
		e.preventDefault();
		setResetting(true);
		const user = { email };

		try {
			await axios
				.post(`${apiURL}/auth/forgot-password`, user, { withCredentials: true })
				.then(async (res) => {
					if (res.status === 200) {
						setEmailSent(true);
						await toast.success(`${res.data}`, {});
					}
				})
				.catch(async (err) => {
					//if error, display the custom error message from the server with toastify.
					await toast.error(`${err.response.data}`, {});
				});
		} catch (error) {
			await toast.error(`${error}`, {});
		}
		setResetting(false);
	};

	return (
		<HelmetProvider>
			<div className="forgotPassword">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Forgot Password - Apex</title>
				</Helmet>
				<div className="container">
					<div className="header">{emailSent ? 'Email Sent!' : 'Reset Password'}</div>

					<div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div>

					{emailSent ? (
						<div className="resentTrue">Check your email for further instructions 🚀</div>
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
						<IoChevronBack /> Back to Login
					</Link>
				</div>
			</div>

			<ToastContainer hideProgressBar autoClose={3000} />
		</HelmetProvider>
	);
};

export default ForgotPassword;
