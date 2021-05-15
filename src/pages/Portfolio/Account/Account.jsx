import './Account.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
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

const Account = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	useEffect(() => {
		async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
				history.push('/login');
			} else if (loggedIn === true) {
				try {
					let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					setUser(user.data);
				} catch (error) {
					console.log('ERROR' + error);
				}
			}
		}
		load();
	}, [getLoggedIn, loggedIn, history]);

    //log the user out
    const handleLogOut = async () => {
        try {
            await axios.post(`${apiURL}/auth/logout`)
            .then(history.push('/login'))
            .catch(async (err) => {
                await toast.dark(`${err.response.data}`, {
					position: toast.POSITION.TOP_CENTER,
				});
            })
        } catch (error) {
            console.log("Error: " + error)
        }
    }
	

	return (
		<div className="account">
			<div className="container">
				<p className="header">My Account</p>
				{user ? (
					<>
						<div className="accountInfo">
							<div className="userDetails">
								<div className="nameAndImage">
									<img src={user.image ? user.image : usrIMG} alt={user.username} />
									<div className="nameAndStatus">
										<p>{user.name ? user.name : user.username + ' 🚀'}</p>
										<p>{user.username}</p>
									</div>
								</div>
								<div className="personalField">
									<NameModal user={user}/>
									<div className="personalFieldEmail">
										<div className="nameAndDisplay">
											<p className="displayLabel">Email</p>
											<p className="displayValue">{user.email}</p>
										</div>
									</div>
									<PasswordModal user={user} />
									
								</div>

								<StatusModal user={user} />

								<div className="helpField">
									<div className="helpAndSupportField">
										<div className="accountIcons">
											<BiSupport />
										</div>
										<p>Help and Support</p>
									</div>

									<div className="privacyField">
										<div className="accountIcons">
											<MdSecurity />
										</div>
										<p>Privacy and Policy</p>
									</div>
									<div className="aboutUsField">
										<div className="accountIcons">
											<MdInfo />
										</div>
										<p>About Us</p>
									</div>
								</div>
							</div>

							{/* button to log the user out */}
							<button onClick={handleLogOut} className="signOut">
								Sign Out
							</button>

							<p className="walletVersion">v 0.01 - pre beta</p>
							<p className="copyright">&copy; Werrey Inc, 2021</p>
						</div>
					</>
				) : (
					<div className="loading">
						<RotateSpinner size={40} color="#fff" />
					</div>
				)}
			</div>
			<BottomNav />
			<ToastContainer />
		</div>
	);
};

export default Account;
