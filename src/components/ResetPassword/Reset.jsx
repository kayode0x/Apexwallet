import './Reset.scss'
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Reset = () => {
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
	const [resetting, setResetting] = useState(false);

    const handleReset = (e) => {
		e.preventDefault();

        if (password !== confirmPassword){
            alert('Passwords do not match')
        } else {
            setResetting(true);
			const user = { password, confirmPassword };
			console.log(JSON.stringify(user));
			setPassword('');
			setConfirmPassword('');

			setTimeout(() => {
				setResetting(false);
				history.push('/login');
			}, 3000);
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
				<title>
					Reset Password - Apex
				</title>
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
		</HelmetProvider>
	);
}

export default Reset;