import './Coin.scss';
import AuthContext from '../Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IoChevronBack } from 'react-icons/io5';
import { RotateSpinner } from 'react-spinners-kit';
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import { BsStarFill, BsStar, BsLink45Deg } from 'react-icons/bs';
import TradeTab from './TradeTab/TradeTab';

const Coin = () => {
	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split('/');
	const coinSearchId = splitLocation[2];

	const history = useHistory();
	const matches = useMediaQuery('(max-width:768px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [canTrade, setCanTrade] = useState(false);
	const [asset, setAsset] = useState(null);
	const [user, setUser] = useState(null);
	const [days, setDays] = useState(7);
	const [coinInfo, setCoinInfo] = useState(null);

	const coingeckoApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}/market_chart?vs_currency=usd&days=${days}`;
	const coingeckoDataApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;
	const apiURL = 'https://api.apexwallet.app/api/v1';

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
					// console.log(user.data);
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
							// console.log("GRAPH: ", data.prices);
							setAsset(data);
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
							console.log('DATA: ', data);
							setCoinInfo(data);
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}
			}
		}

		load();
	}, [getLoggedIn, loggedIn, history, coingeckoApi, coingeckoDataApi]);

	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};

	//shorten the about coin text
	function shortenText(aboutText, length) {
		return aboutText && aboutText.length > length
			? aboutText.slice(0, length).split(' ').slice(0, -1).join(' ')
			: aboutText;
	}

	return (
		<div className="coin">
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
											<div className="watchIcons">
												<BsStar />
												{/* <BsStarFill /> */}
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
															<p>
																You cannot trade {coinInfo.name} till you verify your
																account, then open a wallet.
															</p>
															<button disabled={true}>Trade</button>
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
																	<button disabled={true}>Trade</button>
																</div>
															)}
														</>
													)}
													{/* {user.isActive === true && (
														<>
															{user.wallet !== undefined && (
																<div>
																	<p>
																		Balance $0.00
																	</p>
																	<button disabled={false}>Trade</button>
																</div>
															)}
														</>
													)} */}
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
														<TradeTab user={user} wallet={wallet} coinInfo={coinInfo}/>
													</div>
												</div>
											)}
											{matches && (
												<div className="tradeCoinAndAboutCoin">
													<div className="aboutCoin">
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
