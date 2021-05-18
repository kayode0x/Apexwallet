import './Coin.scss';
import AuthContext from '../Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IoChevronBack } from 'react-icons/io5';
import { RotateSpinner } from 'react-spinners-kit';
import { IconContext } from 'react-icons'
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import { BsStarFill, BsStar, BsLink45Deg } from 'react-icons/bs';
import TradeTab from './TradeTab/TradeTab';

const Coin = () => {
	//get the current location.
	const location = useLocation();
	const { pathname } = location;
	//split the location to get just the coin id.
	const splitLocation = pathname.split('/');
	const coinSearchId = splitLocation[2]; //coin id.

	const history = useHistory();
	const matches = useMediaQuery('(max-width:768px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [canTrade, setCanTrade] = useState(false);
	const [asset, setAsset] = useState(null);
	const [user, setUser] = useState(null);
	const [days, setDays] = useState(7);
	const [coinInfo, setCoinInfo] = useState(null);
	const [watchingCoin, setWatchingCoin] = useState(false);
	const watchingRef = useRef(null);
	const watchingArrayRef = useRef(null);
	let isRendered = useRef(false);

	//ALL URLS HERE
	//api endpoint to get the coin chart.
	const coingeckoApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}/market_chart?vs_currency=usd&days=${days}`;

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
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});

					if (isRendered.current === true) {
						setUser(user.data);
						console.log('USER: ', user.data.watchList);
						watchingArrayRef.current = user.data.watchList; //saves the watchList array as a ref hook to save in case of re-render.
					} else {
						return null;
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
							if (isRendered.current === true) {
								// console.log("GRAPH: ", data.prices);
								setAsset(data);
							} else {
								return null;
							}
						})
						.catch((error) => {
							console.log('ERROR: ', error);
						});
				} catch (error) {
					console.log('ERROR: ' + error);
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
								console.log('DATA: ', data);
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
	}, [getLoggedIn, loggedIn, history, coingeckoApi, coingeckoDataApi, coinSearchId]);

	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};

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
							await toast.dark(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
						.catch(async (err) => {
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
				: //if it's not being watched, add to watch list
				  await axios
						.post(`${apiURL}/user/watch-list`, coinWatch)
						.then(async (res) => {
							await toast.dark(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						})
						.catch(async (err) => {
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
		} catch (error) {
			console.log('ERROR: ' + error);
		}
	};

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
				{coinInfo ? (
					<>
						{asset && (
							<>
								{user && (
									<>
										<div className="graphDiv">
											<p className="graphGoesHere">GRAPH GOES HERE</p>
											<div className="currentPriceAndPercentage">
												<p className="currentPrice">
													${formatNumber(coinInfo.market_data.current_price.usd)}
												</p>
												<p
													style={{
														color:
															coinInfo.market_data.price_change_24h_in_currency.usd < 0
																? '#FF1B1C'
																: '#68df44',
													}}
													className="currentPercentage"
												>
													<span>
														{coinInfo.market_data.price_change_percentage_24h < 0
															? ''
															: '+'}
													</span>
													{Math.round(
														(coinInfo.market_data.price_change_percentage_24h +
															Number.EPSILON) *
															100
													) / 100}
													%
												</p>
											</div>
											<div
												className="watchIcons"
												style={{ color: watchingCoin ? '#FDCA40' : '#5d5c5f' }}
											>
												{watchingCoin ? (
													<IconContext.Provider value={{ className: 'watchingCoinIcon' }}>
														<BsStarFill onClick={triggerWatchCoin} />
													</IconContext.Provider>
												) : (
													<IconContext.Provider value={{ className: 'normalCoinIcon' }}>
														<BsStar onClick={triggerWatchCoin} />
													</IconContext.Provider>
												)}
											</div>
											<div className="selectDays">
												<button className="active oneDay">1D</button>
												<button className="oneWeek">1W</button>
												<button className="oneMonth">1M</button>
												<button className="oneYear">1Y</button>
												<button className="allTime">All</button>
											</div>
										</div>
										<div className="coinInformationContainer">
											{matches && (
												<div className="tradeCoinMobile">
													{user.isActive === false && (
														<div>
															<p>Verify your account before trading {coinInfo.name}</p>
														</div>
													)}
													{user.isActive === true && (
														<>
															{user.wallet === undefined && (
																<div>
																	<p>
																		Before buying {coinInfo.name} please open a
																		wallet.
																	</p>
																</div>
															)}
														</>
													)}
													{user.isActive === true && (
														<>
															{user.wallet !== undefined && (
																<div>
																	<img src={coinInfo.image.large} alt={coinInfo.id} />
																	<p>
																		<span>{coinInfo.symbol}</span> balance
																	</p>
																	<p>$0</p>
																</div>
															)}
														</>
													)}
												</div>
											)}
											<p className="coinStats">{coinInfo.name} Stats</p>
											<div className="coinPricesContainer">
												<div className="mainCoinPrices">
													<div>
														<p>Market Cap</p>
														<p>${formatNumber(coinInfo.market_data.market_cap.usd)}</p>
													</div>
													<div>
														<p>Volume (24 Hours)</p>
														<p>${formatNumber(coinInfo.market_data.total_volume.usd)}</p>
													</div>
													<div>
														<p>Circulating Supply</p>
														<p>
															{formatNumber(coinInfo.market_data.circulating_supply)}{' '}
															<span>{coinInfo.symbol}</span>
														</p>
													</div>
													<div>
														<p>CoinGecko Rank</p>
														<p>#{coinInfo.coingecko_rank}</p>
													</div>
												</div>
											</div>
											<p className="aboutCoinHeader">About {coinInfo.name}</p>
											{matches ? null : (
												<div className="tradeCoinAndAboutCoin">
													<div className="aboutCoin">
														<p>{coinInfo.description.en}</p>
														<p>Resources</p>
														<span>
															<BsLink45Deg />{' '}
															<a href={coinInfo.links.homepage[0]}>Official Website</a>
														</span>
													</div>
													<div className="tradeCoin">
														<TradeTab user={user} wallet={wallet} coinInfo={coinInfo} />
													</div>
												</div>
											)}
											{matches && (
												<div className="tradeCoinAndAboutCoinMobile">
													<div className="aboutCoinMobile">
														<p>{coinInfo.description.en}</p>
														<p>Resources</p>
														<span>
															<BsLink45Deg />{' '}
															<a href={coinInfo.links.homepage[0]}>Official Website</a>
														</span>
													</div>
												</div>
											)}
										</div>
									</>
								)}
							</>
						)}
					</>
				) : (
					<div className="loading">
						<RotateSpinner size={40} color="#080809" />
					</div>
				)}
			</div>
			<ToastContainer autoClose={3000} />
		</div>
	);
};

export default Coin;
