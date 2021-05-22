import './Reset.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset = () => {
	const history = useHistory();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
	const [resetting, setResetting] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	const handleReset = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.dark('Passwords do not match', {
				position: toast.POSITION.TOP_CENTER,
			});
		} else {
			setResetting(true);

			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const token = urlParams.get('token');
			const user = { password, confirmPassword, token };

			try {
				await axios
					.put(`${apiURL}/auth/reset-password/`, user, { withCredentials: true })
					.then(async (res) => {
						if (res.status === 200) {
							await toast.dark(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
							history.push('/login');
						}
					})
					.catch(async (err) => {
						//if error, display the custom error message from the server with toastify.
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});

				setResetting(false);
			} catch (error) {
				await toast.dark(`${error}`, {
					position: toast.POSITION.TOP_CENTER,
				});

				setResetting(false);
			}
		}
	};

	const togglePassword = () => {
		setPasswordVisible(!passwordVisible);
	};

	const togglePasswordConfirm = () => {
		setPasswordConfirmVisible(!passwordConfirmVisible);
	};

	return (
		<HelmetProvider>
			<div className="reset">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Reset Password - Apex</title>
				</Helmet>
				<div className="container">
					<div className="header">Reset Password </div>

					<div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div>

					<form onSubmit={handleReset}>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								type={passwordVisible ? 'text' : 'password'}
								id="password"
								name="password"
								placeholder="Chose a strong password"
								required
								minLength="6"
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

						<div className="confirmPassword">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type={passwordConfirmVisible ? 'text' : 'password'}
								id="confirmPassword"
								name="confirmPassword"
								placeholder="Chose a strong password"
								required
								minLength="6"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<div className="eyeIcons">
								{passwordConfirmVisible ? (
									<BsEyeSlashFill onClick={togglePasswordConfirm} />
								) : (
									<BsEyeFill onClick={togglePasswordConfirm} />
								)}
							</div>
						</div>

						<button disabled={resetting ? true : false} type="submit">
							{resetting ? <RotateSpinner size={30} color="#fff" /> : 'Reset Password'}
						</button>
					</form>
				</div>
			</div>
			{/* {DON'T FORGET THE TOASTIFY} */}
			<ToastContainer autoClose={3000} />
		</HelmetProvider>
	);
};

export default Reset;
