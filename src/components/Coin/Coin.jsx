import './Coin.scss';
import AuthContext from '../Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BiSearch } from 'react-icons/bi';
import { RotateSpinner } from 'react-spinners-kit';
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import { BsStarFill, BsStar } from 'react-icons/bs';

const Coin = () => {

    const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split('/');
    const coinSearchId = splitLocation[2]

    const history = useHistory();
	const matches = useMediaQuery('(min-width:1171px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [canTrade, setCanTrade] = useState(false);
	const [asset, setAsset] = useState(null);
	const [user, setUser] = useState(null);
    const [days, setDays] = useState(7)

    const coingeckoApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}/market_chart?vs_currency=usd&days=${days}`;
    const apiURL = 'https://api.apexwallet.app/api/v1'

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
					if (user.data.isActive === false) {
						setCanTrade(false);
					}
				} catch (error) {
					console.log('ERROR' + error);
				}

				try {
					await fetch(coingeckoApi, {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
                            console.log("GRAPH: ", data.prices);
							setAsset(data);
						})
                        .catch((error) => {console.log("ERROR: ", error)})
				} catch (error) {
					console.log('ERROR: ' + error);
				}
			}
		}

		load();
	}, [getLoggedIn, loggedIn, history, coingeckoApi]);



    return (
		<div className="coin">
			<div className="container">
				<p className="header">{coinSearchId}</p>
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

export default Coin;
