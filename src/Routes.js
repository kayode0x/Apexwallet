import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //useHistory
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Reset from './pages/ResetPassword/Reset';
import './App.css';
import Dashboard from './pages/Portfolio/Dashboard/Dashboard';
import Verify from './pages/Verification/Verify';
import Wallet from './pages/Portfolio/Wallet/Wallet';
import Prices from './pages/Portfolio/Prices/Prices';
import Coin from './components/Coin/Coin';
import Account from './pages/Portfolio/Account/Account';
import Transactions from './pages/Portfolio/Wallet/Transactions/Transactions';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthContext from './components/Auth/AuthContext';
import { useContext } from 'react';

const Routes = () => {
	//the links
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const walletAssetUrl =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20ethereum-classic%2C%20litecoin%2C%20dogecoin%2C%20ripple%2C%20tether%2C%20binancecoin%2C%20cardano%2C%20usd-coin%2C%20tron%2C%20bitcoin-cash%2C%20polkadot%2C%20uniswap%2C%20dash%2C%20decentraland%2C%20shiba-inu%2C%20stellar%2C%20chainlink%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false';

	const newsAPI = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
	const coingeckoPricesInfo = 'https://api.coingecko.com/api/v3/global';

	//redux
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [news, setNews] = useState(null);
	const [user, setUser] = useState(null);
	const [wallet, setWallet] = useState(null);
	const [sorted, setSorted] = useState(null);
	const [prices, setPrices] = useState(null);
	const [marketInfo, setMarketInfo] = useState(null);
	let isRendered = useRef(false);

	//check to see if the user is logged in
	useEffect(() => {
		isRendered.current = true;
		async function load() {
			await getLoggedIn();
		}
		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn]);

	//talk to the APIs only if the user is logged in
	useEffect(() => {
		isRendered.current = true;
		async function load() {
			//updateSite function to update data without reloading the page
			const updateUserData = async () => {
				try {
					let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
						await toast.error(`${err.response.data}`, {});
					});
					if (isRendered.current === true) {
						setUser(user.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR' + error);
				}

				try {
					let wallet = await axios.get(`${apiURL}/wallet/`, { withCredentials: true }).catch(async (err) => {
						await toast.error(err.response.data, {});
					});
					if (isRendered.current === true) {
						setWallet(wallet.data);
						setSorted(wallet.data.transactions);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR2: ', error);
				}
			};

			const updatePrices = async () => {
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
								setPrices(data);
							} else {
								return null;
							}
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}
			}

			if(loggedIn === true){
				//updateSite function to update data without reloading the page
				updateUserData();
				setInterval(updateUserData, 15000); //update every 15 seconds
			}

			if (loggedIn === true) {
				updatePrices();
				setInterval(updatePrices, 30000); //update every 30 seconds
			}

			try {
				const cryptoCompareAPIKey = process.env.REACT_APP_CRYPTO_COMPARE_API;
				await fetch(newsAPI, {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						authorization: `Apikey ${cryptoCompareAPIKey}`,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						setNews(data.Data);
					});
			} catch (error) {
				console.log('ERROR: ', error);
			}

			try {
				await fetch(coingeckoPricesInfo, {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (isRendered.current === true) {
							setMarketInfo(data.data);
						} else {
							return null;
						}
					});
			} catch (error) {
				console.log('ERROR: ' + error);
			}
		}

		//only load if the user is logged in
		if (loggedIn === true) {
			load(); 
		}

		return () => {
			isRendered.current = false;
		};
	}, [loggedIn]);

	return (
		<Router>
			<Switch>
				{/* BELOW ARE THE ROUTES FOR A LOGGED IN USER */}
				<Route exact path="/dashboard">
					<Dashboard loggedIn={loggedIn} news={news} prices={prices} user={user} />
				</Route>
				<Route exact path="/wallet">
					<Wallet loggedIn={loggedIn} user={user} wallet={wallet} prices={prices} />
				</Route>
				<Route exact path="/wallet/transactions">
					<Transactions
						sorted={sorted}
						setSorted={setSorted}
						loggedIn={loggedIn}
						user={user}
						wallet={wallet}
					/>
				</Route>

				<Route exact path="/prices">
					<Prices marketInfo={marketInfo} user={user} prices={prices} />
				</Route>

				<Route exact path="/prices/:coin">
					<Coin loggedIn={loggedIn} user={user} wallet={wallet} />
				</Route>

				<Route exact path="/account">
					<Account user={user} loggedIn={loggedIn} />
				</Route>

				{/* BELOW ARE THE ROUTES FOR A NON-LOGGED IN USER */}
				<Route exact path="/signup">
					<SignUp />
				</Route>

				<Route exact path="/login">
					<Login />
				</Route>

				<Route exact path="/forgot-password">
					<ForgotPassword />
				</Route>

				<Route path="/reset">
					<Reset />
				</Route>

				<Route path="/verify">
					<Verify />
				</Route>

				<Route exact path="/">
					<div className="App">
						<LandingPage />
					</div>
				</Route>

				<Route path="*">
					<h1 style={{ color: '#000', textAlign: 'center' }}>PAGE NOT FOUND</h1>
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
