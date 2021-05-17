import './Wallet.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import uranusSVG from '../../../assets/logo/uranusSVG.svg';
import { ImArrowDownLeft2 } from 'react-icons/im';

const Wallet = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [market, setMarket] = useState(null);
	const [asset, setAsset] = useState(null);
	const [user, setUser] = useState(null);
	const [creatingWallet, setCreatingWallet] = useState(false);
	//breakpoint set at mobile only
	// const matches = useMediaQuery('(max-width:767px)');
	let isRendered = useRef(false);

	//api endpoint.
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const walletAssetUrl =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20bitcoin%2C%20ethereum-classic%2C%20litecoin%2C%20dogecoin%2C%20tron%20binancecoin%2C%20%20ripple%2C%20tether%2C%20&order=market_cap_desc&per_page=100&page=1&sparkline=false';

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
						console.log(wallet);
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

			wallet.coins.forEach((coin) => {
				const newCoin = coin;
				//produce external data for the user's assets
				market.forEach((market) => {
					if (market.id === newCoin.coin) {
						let newCoinData = {
							name: market.name,
							symbol: market.symbol,
							id:market.id,
							usdValue: market.current_price * newCoin.balance,
							price: market.current_price,
							image: market.image,
							balance: newCoin.balance,
						};
						arr.push(newCoinData);
					}
				});
			});

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

	//format the transaction date
	const formatDate = (dateStr) => {
		var date = new Date(dateStr);

		var monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		var d = date.getDate();
		var m = monthNames[date.getMonth()];
		var y = date.getFullYear();

		return `${d + ' ' + m + ' ' + y}`;
	};

	return (
		<div className="wallet">
			<div className="container">
				<p className="header">Wallet</p>
				{user ? (
					<>
						{user.isActive === true && (
							<>
								{user.wallet !== undefined && (
									<>
										{asset && (
											<>
												{wallet && (
													<>
														<div className="walletCard">
															<div className="apexWallet">Apex Card</div>
															<div className="cardBalance">
																<p>
																	<span>$</span>
																	{wallet.balance}
																</p>
															</div>
															<p className="cardNumber">
																<span>6732</span> <span>9239</span> <span>4344</span>{' '}
																<span>2230</span>
															</p>
															<img className="uranusSVG" src={uranusSVG} alt="Uranus" />
														</div>

														{/* Assets container */}
														<p className="assetsHeader">Assets</p>
														{asset.map((asset, index) => (
															<Link
																to={`/market/${asset.id}`}
																className="asset"
																key={index}
															>
																<div className="imageAndName">
																	<img src={asset.image} alt={asset.name} />
																	<div className="nameAndSymbol">
																		<p>{asset.name}</p>
																	</div>
																</div>
																<div className="priceAndBalance">
																	<p>${asset.usdValue}</p>
																	<p>
																		{asset.balance}{' '}
																		<span style={{ textTransform: 'uppercase' }}>
																			{asset.symbol}
																		</span>
																	</p>
																</div>
															</Link>
														))}

														{/* Transactions Container */}
														<p className="transactionsHeader">Transactions</p>
														<div className="walletTransactions">
															{wallet.transactions.map((transaction) => (
																<div
																	className="walletTransaction"
																	key={transaction._id}
																>
																	<div
																		style={{
																			background:
																				transaction.type === 'Free' ||
																				'Bought' ||
																				'Received'
																					? '#C2FEDB'
																					: '#FDC4CC',
																			color:
																				transaction.type === 'Free' ||
																				'Bought' ||
																				'Received'
																					? '#12A550'
																					: '#F71735',
																		}}
																		className="transactionIcon"
																	>
																		<ImArrowDownLeft2 />
																	</div>
																	<div className="memoAndDate">
																		<p>
																			{transaction.type} {transaction.coin}
																		</p>
																		<p>{formatDate(transaction.date)}</p>
																	</div>
																	<div className="value">
																		<p>${transaction.value}</p>
																	</div>
																</div>
															))}
														</div>
													</>
												)}
											</>
										)}
									</>
								)}
							</>
						)}
					</>
				) : (
					<div className="loading">
						<RotateSpinner size={40} color="#fff" />
					</div>
				)}
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
					</>
				) : (
					<div className="loading">
						<RotateSpinner size={40} color="#fff" />
					</div>
				)}

				{user ? (
					<>
						{user.isActive === true && (
							<>
								{user.wallet === undefined && (
									<>
										<div className="createWallet">
											<p>Account Verified!</p>
											<p>
												Your account has been verified, you can now create a wallet and start
												trading 🚀
											</p>

											<button
												onClick={handleCreateWallet}
												disabled={creatingWallet ? true : false}
											>
												{creatingWallet ? (
													<RotateSpinner size={30} color="#fff" />
												) : (
													'Create Wallet'
												)}
											</button>
										</div>
									</>
								)}
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
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Wallet;
