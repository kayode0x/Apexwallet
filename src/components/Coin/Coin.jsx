import './Coin.scss';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IoChevronBack } from 'react-icons/io5';
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import CompleteCoin from './CompleteCoin';
import supportedCoins from '../../utils/supportedCoins';
import useTitle from '../../utils/useTitle';

const Coin = ({ user, wallet, loggedIn }) => {
	//get the current location.
	const location = useLocation();
	const { pathname } = location;
	//split the location to get just the coin id.
	const splitLocation = pathname.split('/');
	const coinSearchId = splitLocation[2]; //coin id.

	const history = useHistory();
	const matches = useMediaQuery('(max-width:767px)');
	const [balance, setBalance] = useState(null);
	const [coinInfo, setCoinInfo] = useState(null);
	const [watchingCoin, setWatchingCoin] = useState(undefined);
	let isRendered = useRef(false);

	//in case someone tries to use an unsupported coin in the link
	const isCoinSupported = supportedCoins.includes(coinSearchId);
	if (isCoinSupported === false) history.goBack(); //go back to the previous page

	//ALL URLS HERE
	//api endpoint to get the coin data.
	const coingeckoDataApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;

	//global api for Apexwallet.
	const apiURL = 'https://api.apexwallet.app/v1';

	useEffect(() => {
		isRendered.current = true;
		async function load() {
			if (loggedIn === false) {
				history.push('/login');
			} else if (loggedIn === true) {
				async function update() {
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
				}

				update();

				setInterval(() => {
					update();
				}, 10000);

				//check if the user is watching the coin in question.
				const checkWatchingCoin = () => {
					if (user !== null) {
						//check if a coin with the coinId matches the coinSearchId
						const watching = user.watchList.filter((watching) => watching.coinId === coinSearchId);

						//if yes, then the user is watching the coin in question.
						if (watching.length > 0 && watching[0].coinId === coinSearchId) {
							setWatchingCoin(true);
						} else setWatchingCoin(false);
					}
				};

				checkWatchingCoin();
			}
		}

		load();

		return () => {
			isRendered.current = false;
		};
	}, [loggedIn, user, history, coingeckoDataApi, coinSearchId]);

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
						.catch(async (err) => {
							await toast.error(`${err.response.data}`, {});
						})
				: //if it's not being watched, add to watch list
				  await axios.post(`${apiURL}/user/watch-list`, coinWatch).catch(async (err) => {
						await toast.error(`${err.response.data}`, {});
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
		if (user !== null && user.isActive === true && wallet !== null && coinInfo !== null) {
			callPrice(); //only call this function if the user is active and has a wallet
		}
	}, [coinInfo, user, wallet]);

	useTitle(coinInfo ? `${coinInfo.name} | Apexwallet` : `${coinSearchId} | Apexwallet`);

	return (
		<div className="coin">
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
			<ToastContainer hideProgressBar autoClose={3000} />
		</div>
	);
};

export default Coin;
