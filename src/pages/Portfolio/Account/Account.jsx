import './Account.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import usrIMG from '../../../assets/logo/package.svg';
import StatusModal from './StatusModal/Modal';
import { BiSupport } from 'react-icons/bi';
import { MdSecurity, MdInfo } from 'react-icons/md';
import PasswordModal from './PasswordModal/PasswordModal';
import NameModal from './NameModal/NameModal';
import { FiChevronRight } from 'react-icons/fi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { IoCamera } from 'react-icons/io5';

const Account = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const apiURL = 'https://api.apexwallet.app/api/v1';
	let isRendered = useRef(false);

	useEffect(() => {
		isRendered.current = true;
		async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
				history.push('/login');
			} else if (loggedIn === true) {
				try {
					let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
						await toast.error(`${err.response.data}`, {
							
						});
					});
					if (isRendered.current === true) {
						setUser(user.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR' + error);
				}
			}
		}
		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn, history]);

	//log the user out
	const handleLogOut = async () => {
		try {
			await axios
				.post(`${apiURL}/auth/logout`)
				.then(history.push('/login'))
				.catch(async (err) => {
					await toast.error(`${err.response.data}`, {
						
					});
				});
		} catch (error) {
			console.log('Error: ' + error);
		}
	};

	return (
		<HelmetProvider>
			<div className="account">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Account - Apex</title>
				</Helmet>
				<BottomNav />
				<div className="container">
					<p className="header">Account</p>
					{user ? (
						<>
							<div className="accountInfo">
								<div className="userDetails">
									<div className="nameAndImage">
										<div onClick={() => alert('Coming Soon.')} className="cameraIcon">
											<IoCamera />
										</div>
										{/* <div className="imgDiv">{user.username.charAt(0).toUpperCase()}</div> */}
										<img src={usrIMG} alt={user.username} />
										<div className="nameAndStatus">
											<p style={{ textTransform: user.name ? '' : 'capitalize' }}>
												{user.name ? user.name : user.username + ' 🚀'}
											</p>
											<p>{user.username}</p>
										</div>
									</div>
									<NameModal user={user} />
									<div className="personalFieldEmail">
										<div className="nameAndDisplay">
											<p className="displayLabel">Email</p>
											<p className="displayValue">{user.email}</p>
										</div>
									</div>
									<PasswordModal user={user} />

									<StatusModal user={user} />

									<div onClick={() => alert('Coming Soon.')} className="helpAndSupportField">
										<div className="accountIcons">
											<BiSupport />
										</div>
										<p>Help and Support</p>
										<div className="editIcon">
											<FiChevronRight />
										</div>
									</div>

									<div onClick={() => alert('Coming Soon.')} className="privacyField">
										<div className="accountIcons">
											<MdSecurity />
										</div>
										<p>Privacy and Policy</p>
										<div className="editIcon">
											<FiChevronRight />
										</div>
									</div>
									<div onClick={() => alert('Coming Soon.')} className="aboutUsField">
										<div className="accountIcons">
											<MdInfo />
										</div>
										<p>About Us</p>
										<div className="editIcon">
											<FiChevronRight />
										</div>
									</div>
								</div>

								{/* button to log the user out */}
								<button onClick={handleLogOut} className="signOut">
									Sign Out
								</button>

								<p className="walletVersion">v1 - beta 🚀</p>
								<p className="copyright">Apex Wallet, from Werrey Inc 🦄. &copy; 2021</p>
							</div>
						</>
					) : (
						<div className="loading">
							<RotateSpinner size={40} color="#080809" />
						</div>
					)}
				</div>
				<ToastContainer hideProgressBar autoClose={3000} />
			</div>
		</HelmetProvider>
	);
};

export default Account;
