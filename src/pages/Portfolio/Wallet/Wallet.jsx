import './Wallet.scss';
import AuthContext from '../../../components/Auth/AuthContext'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';

const Wallet = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
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
					console.log(user.data);
				} catch (error) {
					console.log('ERROR' + error.response);
				}

				try {
					let wallet = await axios.get(`${apiURL}/wallet/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(err.response.data, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					setWallet(wallet.data);
					console.log(wallet);
				} catch (error) {
					console.log('ERROR2: ', error);
				}
			}
		}
		load();
	}, [getLoggedIn, loggedIn, history]);
	return (
		<div className="wallet">
			<div className="container">
				<p className="header">Wallet</p>
				{user ? (
					<>
						{user.isActive === false && (
							<>
								<div className="notActive">
									<p className="leadText">Verify your account</p>
									<p className="subText">
										You can not open a wallet until you have verified your account.
									</p>
									<p className="thirdText">Check your email 😉</p>
								</div>
								<div className="notActive2">
									<p>Once you have verified your account, your assets will show up here.</p>
								</div>
							</>
						)}
						{user.isActive === true && (
							<>
								<div className="notActive">
									<p className="leadText">Account verified</p>
									<p className="subText">
										Currently working on the stuffs that will go up here, please check back for updates.
									</p>
									<p className="thirdText">⏳</p>
								</div>
							</>
						)}
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

export default Wallet;
