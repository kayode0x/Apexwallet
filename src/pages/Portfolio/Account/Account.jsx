import './Account.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import usrIMG from '../../../assets/logo/package.svg';
import { GoUnverified, GoVerified } from 'react-icons/go';
import { RiUser3Fill } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { MdSecurity, MdInfo } from 'react-icons/md';

const Account = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const apiURL = 'https://api.apexwallet.app/api/v1';
	//breakpoint set at mobile only
	const matches = useMediaQuery('(max-width:767px)');

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
            .then(()=> history.push('/login'))
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
				<p className="header">Account</p>
				{user ? (
					<>
						<div className="accountInfo">
							<div className="userDetails">
								<img src={user.image ? user.image : usrIMG} alt={user.username} />
								<div className="nameAndStatus">
									<p>{user.name ? user.name : user.username + ' 🚀'}</p>
									<p>Username: {user.username}</p>
								</div>

								<ul>
									<li>
										<RiUser3Fill />
										<p>Personal</p>
									</li>
									<li>
										{user.isActive === true ? <GoVerified /> : <GoUnverified />}
										<p>Status</p>
										<span style={{ background: user.isActive === true ? '#109648' : '#BF211E' }}>
											{user.isActive === true ? 'Verified' : 'Unverified'}
										</span>
									</li>
									<li>
										<BiSupport />
										<p>Help and Support</p>
									</li>
									<li>
										<MdSecurity />
										<p>Privacy and Security</p>
									</li>
									<li>
										<MdInfo />
										<p>About Us</p>
									</li>
								</ul>
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
