import './Market.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BiSearch } from 'react-icons/bi';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { BsStarFill, BsStar } from 'react-icons/bs';

const Market = () => {
	const history = useHistory();
	const matches = useMediaQuery('(min-width:1171px)');
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [canTrade, setCanTrade] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [user, setUser] = useState(null);
	const [market, setMarket] = useState(null);
	const [marketInfo, setMarketInfo] = useState(null);
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const coingeckoApi =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20litecoin%2C%20tether%2C%20dogecoin%2C%20ethereum%2C%20ethereum-classic%2C%20ripple%2C%20binancecoin%2C%20cardano%2C%20usd-coin%2C%20tron%2C%20bitcoin-cash%2C%20polkadot%2C%20uniswap%2C%20dash%2C%20&order=market_cap_desc&per_page=100&page=1&sparkline=false';

	const coingeckoMarketInfo = 'https://api.coingecko.com/api/v3/global';

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
							setMarket(data);
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}

				try {
					await fetch(coingeckoMarketInfo, {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
						},
					})
						.then((response) => response.json())
						.then((data) => {
							setMarketInfo(data.data);
						});
				} catch (error) {
					console.log('ERROR: ' + error);
				}
			}
		}

		load();
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
	if (market) {
		allCoins = market.filter((coin) => coin.name.toLowerCase().includes(searchText.toLowerCase()));
	}

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchText(e.target.value.toLowerCase());
	};

	return (
		<div className="market">
			<div className="container">
				<p className="header">Market</p>

				{market ? (
					<>
						{user && (
							<>
								<div className="marketAndTrade">
									<div className="marketData">
										{marketInfo && (
											<div className="marketInfo">
												<div className="marketCap">
													<p>Market Cap.</p>
													<p>${formatNumber(marketInfo.total_market_cap.usd)}</p>
													<p
														style={{
															color:
																marketInfo.market_cap_change_percentage_24h_usd < 0
																	? '#FF1B1C'
																	: '#68df44',
														}}
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

												<div className="marketVolume">
													<p>Volume 24h</p>
													<p>${formatNumber(marketInfo.total_volume.usd)}</p>
													<p>-</p>
												</div>

												<div className="BTCDominance">
													<p>BTC Dominance</p>
													<p>
														{Math.round(
															(marketInfo.market_cap_percentage.btc + Number.EPSILON) *
																100
														) / 100}
														%
													</p>

													<p>-</p>
												</div>
											</div>
										)}
										<div className="searchAndSort">
											<div className="searchBar">
												<input
													type="text"
													required
													placeholder="Search for an asset"
													onChange={handleSearch}
												/>
												<div className="searchIcon">
													<BiSearch />
												</div>
											</div>
											{/* <div className="sortBar">Sorting goes here</div> */}
										</div>
										{allCoins.map((coin) => (
											<Link
												className="coinList"
												key={coin.id}
												// onClick={() => console.log('Clicked Coin: ', coin)}
                                                to={`/market/${coin.id}`}
											>
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
														<span>{coin.price_change_percentage_24h < 0 ? '' : '+'}</span>
														{Math.round(
															(coin.price_change_percentage_24h + Number.EPSILON) * 100
														) / 100}
														%
													</p>
												</div>
												<p className="coinMarketCap">${formatNumber(coin.market_cap)}</p>
											</Link>
										))}
									</div>
									{matches && <div className="marketTrade"></div>}
								</div>
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

export default Market;
