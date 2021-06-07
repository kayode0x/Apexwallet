import './Coin.scss';
import AuthContext from '../Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IoChevronBack } from 'react-icons/io5';
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CompleteCoin from './CompleteCoin';
import supportedCoins from '../../utils/supportedCoins'

const Coin = () => {
	//get the current location.
	const location = useLocation();
	const { pathname } = location;
	//split the location to get just the coin id.
	const splitLocation = pathname.split('/');
	const coinSearchId = splitLocation[2]; //coin id.

	

	const history = useHistory();
	const matches = useMediaQuery('(max-width:767px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [balance, setBalance] = useState(null);
	const [user, setUser] = useState(null);
	const [coinInfo, setCoinInfo] = useState(null);
	const [watchingCoin, setWatchingCoin] = useState(false);
	const watchingRef = useRef(null);
	const watchingArrayRef = useRef(null);
	let isRendered = useRef(false);

	//in case someone tries to use an unsupported coin in the link
	const isCoinSupported = supportedCoins.includes(coinSearchId);
	if (isCoinSupported === false) history.goBack(); //go back to the previous page

	//ALL URLS HERE
	//api endpoint to get the coin data.
	const coingeckoDataApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;

	//global api for Apex Wallet.
	const apiURL = 'https://api.apexwallet.app/api/v1';

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
							position: toast.POSITION.TOP_CENTER,
						});
					});

					if (isRendered.current === true) {
						setUser(user.data);
						watchingArrayRef.current = user.data.watchList; //saves the watchList array as a ref hook to save in case of re-render.
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR' + error);
				}

				try {
					let wallet = await axios.get(`${apiURL}/wallet/`, { withCredentials: true }).catch(async (err) => {
						await toast.error(err.response.data, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					if (isRendered.current === true) {
						setWallet(wallet.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR2: ', error);
				}

				try {
					await fetch(coingeckoDataApi, {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
							if (isRendered.current === true) {
								setCoinInfo(data);
							} else {
								return null;
							}
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}

				if (isRendered.current === true) {
					//okay this part gets the current coin id and saves it in case the page re-renders.
					watchingRef.current = (obj) => obj.coinId === coinSearchId; //check if the current coin is in the user's watch list
					if (watchingArrayRef.current.some(watchingRef.current) === true) {
						setWatchingCoin(true); //if yes, set the coin state to watching (true)
					} else {
						setWatchingCoin(false); //if no, set the coin state to not watching (false)
					}
				}
			}
		}

		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn, history, coingeckoDataApi, coinSearchId]);

	//function to watch or unwatch a coin
	const triggerWatchCoin = async () => {
		setWatchingCoin(!watchingCoin);
		let name = coinInfo.name;
		let coinId = coinInfo.id;
		const coinWatch = { name, coinId };

		try {
			watchingCoin
				? await axios //if the coin is being watched, send an unwatch request
						.put(`${apiURL}/user/watch-list`, coinWatch)
						.then(async (res) => {
							await toast.success(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
						.catch(async (err) => {
							await toast.error(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
				: //if it's not being watched, add to watch list
				  await axios
						.post(`${apiURL}/user/watch-list`, coinWatch)
						.then(async (res) => {
							await toast.success(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
						.catch(async (err) => {
							await toast.error(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
		} catch (error) {
			console.log('ERROR: ' + error);
		}
	};

	//get the current price from coin gecko then pass it into the coin the user is currently viewing
	useEffect(() => {
		async function callPrice() {
			let newCoinBalance;
			newCoinBalance = wallet.coins.filter((coin) => coin.coin === coinInfo.id);
			if (newCoinBalance[0] === undefined) {
				setBalance(0);
			} else {
				setBalance(newCoinBalance[0].balance);
			}
		}
		if (
			user !== null &&
			user.isActive === true &&
			(user.wallet !== undefined) & (wallet !== null) &&
			coinInfo !== null
		) {
			callPrice(); //only call this function if the user is active and has a wallet
		}
	}, [coinInfo, user, wallet]);

	return (
		<HelmetProvider>
			<div className="coin">
				<Helmet>
					<meta charSet="utf-8" />
					<title>{coinInfo ? coinInfo.name : coinSearchId} - Apex</title>
				</Helmet>
				<BottomNav />
				<div className="container">
					<div className="header">
						<div className="coinBackEmoji" onClick={history.goBack}>
							<IoChevronBack />
						</div>
						<div className="coinImageAndName">
							{coinInfo && <img src={coinInfo.image.large} alt={coinInfo.symbol} />}
							<p>{coinInfo ? coinInfo.name : coinSearchId}</p>
						</div>
					</div>
					{/* Moved the coin to a new component */}
					<CompleteCoin
						coinInfo={coinInfo}
						user={user}
						watchingCoin={watchingCoin}
						triggerWatchCoin={triggerWatchCoin}
						matches={matches}
						balance={balance}
						wallet={wallet}
						coinSearchId={coinSearchId}
					/>
				</div>
				<ToastContainer autoClose={3000} />
			</div>
		</HelmetProvider>
	);
};

export default Coin;
