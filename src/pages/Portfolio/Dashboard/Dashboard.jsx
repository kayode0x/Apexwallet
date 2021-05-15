import './Dashboard.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';

const Dashboard = () => {
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
					console.log(user.data);
				} catch (error) {
					console.log('ERROR' + error.response);
				}
			}
		}
		load();
	}, [getLoggedIn, loggedIn, history]);

	return (
		<div className="dashboard">
			<div className="container">
				<p className="header">Home</p>
				{user ? (
					<div className="notActive">
						{user.isActive === false && (
							<>
								<p className="leadText">Verify your account</p>
								<p className="subText">
									Welcome to the crypto world, as a new user, you need to verify your account before
									doing anything.
								</p>
								<p className="thirdText">Check your email 😉</p>
							</>
						)}
						{user.isActive === true && (
							<>
								<p className="leadText">Account verified</p>
								<p className="subText">
									Currently working on the stuffs that will go up here, please check back for updates.
								</p>
								<p className="thirdText">⏳</p>
							</>
						)}
					</div>
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

export default Dashboard;
