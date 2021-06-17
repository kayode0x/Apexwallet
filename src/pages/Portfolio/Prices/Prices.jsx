import './Prices.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { FcCalculator } from 'react-icons/fc';
import { IoClose, IoCalculator } from 'react-icons/io5';

const Prices = () => {
	const history = useHistory();
	// const matches = useMediaQuery('(min-width:1171px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	// const [wallet, setWallet] = useState(null);
	// const [canTrade, setCanTrade] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [search, setSearch] = useState(false);
	const [user, setUser] = useState(null);
	const [prices, setPrices] = useState(null);
	const [marketInfo, setMarketInfo] = useState(null);
	const [sort, setSort] = useState('all');
	const [searchActive, setSearchActive] = useState(false);
	let isRendered = useRef(false);

	const apiURL = 'https://api.apexwallet.app/api/v1';
	const coingeckoApi =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20litecoin%2C%20tether%2C%20dogecoin%2C%20ethereum%2C%20ethereum-classic%2C%20ripple%2C%20binancecoin%2C%20cardano%2C%20usd-coin%2C%20tron%2C%20bitcoin-cash%2C%20polkadot%2C%20uniswap%2C%20dash%2C%20&order=market_cap_desc&per_page=100&page=1&sparkline=false';
	// decentraland = %20decentraland%2C

	const coingeckoPricesInfo = 'https://api.coingecko.com/api/v3/global';

	useEffect(() => {
		isRendered.current = true;
		async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
				history.push('/login');
			} else if (loggedIn === true) {
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
					await fetch(coingeckoApi, {
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
		}

		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn, history]);

	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};

	let allCoins;
	//search for a coin
	if (prices) {
		if (sort === 'all') {
			function compare(a, b) {
				if (a.market_cap < b.market_cap) {
					return 1;
				}
				if (a.market_cap > b.market_cap) {
					return -1;
				}
				return 0;
			}

			allCoins = prices.sort(compare);
			if (search === true) {
				allCoins = prices.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
			}
		} else if (sort === 'price') {
			function compare(a, b) {
				if (a.current_price < b.current_price) {
					return 1;
				}
				if (a.current_price > b.current_price) {
					return -1;
				}
				return 0;
			}

			allCoins = prices.sort(compare);

			if (search === true) {
				allCoins = allCoins.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
			}
		} else if (sort === 'gainers') {
			allCoins = prices.filter((coin) => coin.price_change_percentage_24h > 0);

			if (search === true) {
				allCoins = allCoins.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
			}
		} else if (sort === 'losers') {
			allCoins = prices.filter((coin) => coin.price_change_percentage_24h < 0);
			function compare(a, b) {
				if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
					return 1;
				}
				if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
					return -1;
				}
				return 0;
			}

			allCoins = allCoins.sort(compare);

			if (search === true) {
				allCoins = allCoins.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
			}
		}
	}

	return (
		<HelmetProvider>
			<div className="prices">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Prices - Apex</title>
				</Helmet>
				<BottomNav />
				<div className="container">
					<p className="header">Prices</p>

					{prices ? (
						<>
							{user && (
								<>
									<div className="pricesAndTrade">
										<div className="pricesData">
											{marketInfo && (
												<div className="calculatorAndMarketInfo">
													<div className="marketInfoDiv">
														<p className="marketInfoHeader">
															Market is{' '}
															<span>
																{marketInfo.market_cap_change_percentage_24h_usd < 0
																	? 'down'
																	: 'up'}
															</span>
														</p>
														<p
															style={{
																color:
																	marketInfo.market_cap_change_percentage_24h_usd < 0
																		? '#FF1B1C'
																		: '#68df44',
															}}
															className="marketPercent"
														>
															<span>
																{marketInfo.market_cap_change_percentage_24h_usd < 0
																	? ''
																	: '+'}
															</span>
															{Math.round(
																(marketInfo.market_cap_change_percentage_24h_usd +
																	Number.EPSILON) *
																	100
															) / 100}
															%
														</p>
													</div>

													<div className="calculatorIcon">
														<IoCalculator
															onClick={() => alert('Quick converter coming soon.')}
														/>
													</div>
												</div>
											)}
											<div className="searchAndSort">
												{searchActive ? null : (
													<div
														style={{
															animation: searchActive
																? 'sortAnimOut .3s ease forwards'
																: 'sortAnimIn .3s ease forwards',
														}}
														className="sortBar"
													>
														<p>Sort By</p>
														<div
															onClick={() => setSort('all')}
															className={sort === 'all' ? 'active' : ''}
														>
															All
														</div>
														<div
															onClick={() => setSort('price')}
															className={sort === 'price' ? 'active' : ''}
														>
															Price
														</div>
														<div
															onClick={() => setSort('gainers')}
															className={sort === 'gainers' ? 'active' : ''}
														>
															Gainers
														</div>
														<div
															onClick={() => setSort('losers')}
															className={sort === 'losers' ? 'active' : ''}
														>
															Losers
														</div>
													</div>
												)}
												<div
													style={{ width: searchActive ? '100%' : '20%' }}
													className="searchBar"
												>
													{searchActive && (
														<input
															style={{ width: searchActive ? '100%' : '10%' }}
															type="text"
															required
															placeholder="Search for an asset"
															onChange={(e) => {
																setSearchText(e.target.value.toLowerCase());
																setSearch(true);
															}}
														/>
													)}
													<div
														onClick={() => {
															setSearchActive(!searchActive);
															setSearchText('');
														}}
														className={searchActive ? 'searchIcon' : 'searchIcon inactive'}
													>
														{searchActive ? <IoClose /> : <BiSearch />}
													</div>
												</div>
											</div>

											{allCoins.map((coin) => (
												<Link className="coinList" key={coin.id} to={`/prices/${coin.id}`}>
													<div className="imageAndName">
														<img className="coinImage" src={coin.image} alt={coin.name} />
														<div className="coinNames">
															<p className="coinName">{coin.name}</p>
															<p className="coinSymbol">{coin.symbol}</p>
														</div>
													</div>
													<div className="priceAndPercentage">
														<p className="coinPrice">${coin.current_price}</p>
														<p
															className={
																coin.price_change_percentage_24h < 0
																	? 'coinPercentDown'
																	: 'coinPercentUp'
															}
														>
															<span>
																{coin.price_change_percentage_24h < 0 ? '' : '+'}
															</span>
															{Math.round(
																(coin.price_change_percentage_24h + Number.EPSILON) *
																	100
															) / 100}
															%
														</p>
													</div>
													<p className="coinMarketCap">${formatNumber(coin.market_cap)}</p>
												</Link>
											))}
										</div>
									</div>
								</>
							)}
						</>
					) : (
						<div className="loading">
							<RotateSpinner size={40} color="#080809" />
						</div>
					)}
				</div>
				<ToastContainer hideProgressBar autoClose={3000} />
			</div>
		</HelmetProvider>
	);
};

export default Prices;
