import './ForgotPassword.scss';
// import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTitle from '../../utils/useTitle'

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [resetting, setResetting] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';
	useTitle('Forgot Password | Apexwallet');

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
		<>
			<div className="forgotPassword">
				<div className="container">
					<div className="header">
						<p>{emailSent ? 'Email Sent!' : 'Reset Password'}</p>
						<span>{emailSent ? '' : 'Please provide your email address'}</span>
					</div>

					{/* <div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div> */}

					{emailSent ? (
						<div className="resentTrue">Please check your email for further instructions.</div>
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
		</>
	);
};

export default ForgotPassword;
