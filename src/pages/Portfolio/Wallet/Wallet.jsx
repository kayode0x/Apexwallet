import './Wallet.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BottomNav from '../../../components/BottomNav/BottomNav';
import completeUser from './CompleteUser/CompleteUser';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Wallet = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [market, setMarket] = useState(null);
	const [asset, setAsset] = useState(null);
	const [user, setUser] = useState(null);
	const [creatingWallet, setCreatingWallet] = useState(false);
	//breakpoint set at mobile only
	const matches = useMediaQuery('(max-width:767px)');
	let isRendered = useRef(false);

	//api endpoint.
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const walletAssetUrl =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20litecoin%2C%20tether%2C%20dogecoin%2C%20ethereum%2C%20ethereum-classic%2C%20ripple%2C%20binancecoin%2C%20cardano%2C%20usd-coin%2C%20tron%2C%20bitcoin-cash%2C%20polkadot%2C%20uniswap%2C%20dash%2C%20&order=market_cap_desc&per_page=100&page=1&sparkline=false';

	useEffect(() => {
		isRendered.current = true;
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
					if (isRendered.current === true) {
						setUser(user.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR: ' + error);
				}

				try {
					let wallet = await axios.get(`${apiURL}/wallet/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(err.response.data, {
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
					await fetch(walletAssetUrl, {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
							if (isRendered.current === true) {
								setMarket(data);
								// console.log(market)
							} else {
								return null;
							}
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}
			}
		}
		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn, history]);

	useEffect(() => {
		if (market !== null && wallet !== null && user !== null) {
			let arr = [];

			if (wallet.coins !== undefined) {
				wallet.coins.forEach((coin) => {
					const newCoin = coin;
					//produce external data for the user's assets
					market.forEach((market) => {
						if (market.id === newCoin.coin) {
							let newCoinData = {
								name: market.name,
								symbol: market.symbol,
								id: market.id,
								usdValue: market.current_price * newCoin.balance,
								price: market.current_price,
								image: market.image,
								balance: newCoin.balance,
							};
							arr.push(newCoinData);
						}
					});
				});
			}

			function compare(a, b) {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			}

			arr.sort(compare);
			setAsset(arr);
		}
	}, [market, wallet, user]);

	//create a wallet
	const handleCreateWallet = async (e) => {
		e.preventDefault();

		setCreatingWallet(true);
		try {
			await axios
				.post(`${apiURL}/wallet/`, { withCredentials: true })
				.then(async (res) => {
					if (res.status === 201) {
						await toast.dark(res.data, {
							position: toast.POSITION.TOP_CENTER,
						});
						setTimeout(() => {
							window.location.reload();
						}, 2000);
					}
				})
				.catch(async (err) => {
					await toast.dark(err.response.data, {
						position: toast.POSITION.TOP_CENTER,
					});
					setCreatingWallet(false);
				});
		} catch (error) {
			console.log('Error: ', error);
			setCreatingWallet(false);
		}
	};

	return (
		<HelmetProvider>
			<div className="wallet">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Wallet - Apex</title>
				</Helmet>
				<BottomNav />
				<div className="container">
					<p className="header">Wallet</p>

					{/* Moved the complete user to a separate function */}
					{completeUser(user, asset, wallet, handleCreateWallet, creatingWallet, matches)}
				</div>
				<ToastContainer autoClose={3000} />
			</div>
		</HelmetProvider>
	);
};

export default Wallet;
