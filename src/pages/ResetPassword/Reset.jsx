import './Reset.scss';
// import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import useTitle from '../../utils/useTitle'
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
	const apiURL = 'https://api.apexwallet.app/v1';
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const token = urlParams.get('token');

	if (token === null) {
		history.push('/forgot-password');
	}

	useTitle('Reset Password | Apexwallet');

	const handleReset = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match', {});
		} else {
			setResetting(true);
			const user = { password, confirmPassword, token };

			try {
				await axios
					.put(`${apiURL}/auth/reset-password/`, user, { withCredentials: true })
					.then(async (res) => {
						if (res.status === 200) {
							await toast.success(`${res.data}`, {});
							history.push('/login');
						}
					})
					.catch(async (err) => {
						//if error, display the custom error message from the server with toastify.
						await toast.error(`${err.response.data}`, {});
					});

				setResetting(false);
			} catch (error) {
				await toast.error(`${error}`, {});

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
		<>
			<div className="reset">
				<div className="container">
					<div className="header">
						<p>Reset Password</p>
						<span>
							Please enter your new password
						</span>
					</div>

					{/* <div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div> */}

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

			<ToastContainer hideProgressBar autoClose={3000} />
		</>
	);
};

export default Reset;
