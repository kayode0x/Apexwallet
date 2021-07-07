import './Prices.scss';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import useTitle from '../../../utils/useTitle';
import { IoClose, IoCalculator } from 'react-icons/io5';

const Prices = ({ user, prices, marketInfo, loggedIn }) => {
	const history = useHistory();
	const [searchText, setSearchText] = useState('');
	const [search, setSearch] = useState(false);
	const [sort, setSort] = useState('all');
	const [searchActive, setSearchActive] = useState(false);
	const [converter, setConverter] = useState(false);
	const [coinValue, setCoinValue] = useState(1);
	const [coinFrom, setCoinFrom] = useState('bitcoin');
	const [coinTo, setCoinTo] = useState('usd');
	const [calculatedData, setCalculatedData] = useState('Loading...');
	useTitle('Prices | Apexwallet');

	useEffect(() => {
		if (loggedIn === false) {
			history.push('/login');
		}
	}, [loggedIn, history]);

	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};

	const handleChangeFrom = (event) => {
		setCoinFrom(event.target.value);
	};

	const handleChangeTo = (event) => {
		setCoinTo(event.target.value);
	};

	useEffect(() => {
		const converterUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinFrom}&vs_currencies=${coinTo}`;
		async function loadConverter() {
			try {
				await fetch(converterUrl, {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						setCalculatedData(data[coinFrom][coinTo]);
					});
			} catch (error) {
				console.log('ERROR: ' + error);
			}
		}

		loadConverter();
	}, [coinFrom, coinTo]);

	//function for quick converter
	const quickConverter = () => {
		return (
			<div className={`converterModal ${converter ? 'Show' : ''}`}>
				<div className="container">
					<input
						placeholder="Enter Amount to Convert"
						type="number"
						step="all"
						value={coinValue}
						onChange={(e) => setCoinValue(e.target.value)}
					/>
					<Select className="selectCoinFrom" value={coinFrom} onChange={handleChangeFrom}>
						<MenuItem value={'bitcoin'}>Bitcoin</MenuItem>
						<MenuItem value={'ethereum'}>Ethereum</MenuItem>
						<MenuItem value={'ethereum-classic'}>Ethereum Classic</MenuItem>
						<MenuItem value={'litecoin'}>Litecoin</MenuItem>
						<MenuItem value={'dogecoin'}>Dogecoin</MenuItem>
						<MenuItem value={'ripple'}>Ripple</MenuItem>
						<MenuItem value={'tether'}>Tether</MenuItem>
						<MenuItem value={'binancecoin'}>Binance Coin</MenuItem>
						<MenuItem value={'cardano'}>Cardano</MenuItem>
						<MenuItem value={'usd-coin'}>USD Coin</MenuItem>
						<MenuItem value={'tron'}>Tron</MenuItem>
						<MenuItem value={'bitcoin-cash'}>Bitcoin Cash</MenuItem>
						<MenuItem value={'polkadot'}>Polkadot</MenuItem>
						<MenuItem value={'uniswap'}>Uniswap</MenuItem>
						<MenuItem value={'dash'}>Dash</MenuItem>
						<MenuItem value={'decentraland'}>Decentraland</MenuItem>
						<MenuItem value={'shiba-inu'}>Shiba Inu</MenuItem>
						<MenuItem value={'stellar'}>Stellar</MenuItem>
						<MenuItem value={'chainlink'}>Chainlink</MenuItem>
						<MenuItem value={'solana'}>Solana</MenuItem>
					</Select>
					<Select className="selectCoinTo" value={coinTo} onChange={handleChangeTo}>
						<MenuItem value={'usd'}>US Dollar</MenuItem>
						<MenuItem value={'btc'}>Bitcoin</MenuItem>
						<MenuItem value={'eth'}>Ethereum</MenuItem>
						<MenuItem value={'ltc'}>Litecoin</MenuItem>
						<MenuItem value={'xrp'}>Ripple</MenuItem>
						<MenuItem value={'bnb'}>Binance Coin</MenuItem>
						<MenuItem value={'xlm'}>Stellar</MenuItem>
						<MenuItem value={'link'}>Chainlink</MenuItem>
						<MenuItem value={'eos'}>EOS</MenuItem>
						<MenuItem value={'bch'}>Bitcoin Cash</MenuItem>
						<MenuItem value={'dot'}>Polkadot</MenuItem>
						<MenuItem value={'yfi'}>Yearn</MenuItem>
						<MenuItem value={'dash'}>Dash</MenuItem>
						<MenuItem value={'eur'}>Euro</MenuItem>
						<MenuItem value={'gbp'}>Pound Sterling</MenuItem>
						<MenuItem value={'cny'}>Chinese Yuan</MenuItem>
						<MenuItem value={'chf'}>Swiss Franc</MenuItem>
						<MenuItem value={'aed'}>UAE Dirham</MenuItem>
						<MenuItem value={'ars'}>Argentine Peso</MenuItem>
						<MenuItem value={'aud'}>Australian Dollar</MenuItem>
						<MenuItem value={'bhd'}>Bahraini Dinar</MenuItem>
						<MenuItem value={'brl'}>Brazilian Real</MenuItem>
						<MenuItem value={'cad'}>Canadian Dollar</MenuItem>
						<MenuItem value={'inr'}>Indian Rupee</MenuItem>
						<MenuItem value={'jpy'}>Japanese Yen</MenuItem>
						<MenuItem value={'mxn'}>Mexican Peso</MenuItem>
						<MenuItem value={'myr'}>Malaysian ringgit</MenuItem>
						<MenuItem value={'ngn'}>Nigerian Naira</MenuItem>
						<MenuItem value={'sar'}>Saudi Riyal</MenuItem>
						<MenuItem value={'sgd'}>Singapore Dollar</MenuItem>
						<MenuItem value={'zar'}>South African Rand</MenuItem>
						<MenuItem value={'xag'}>Silver</MenuItem>
						<MenuItem value={'xau'}>Gold</MenuItem>
						<MenuItem value={'sats'}>Satoshi</MenuItem>
					</Select>
					<p>
						{coinValue} {coinFrom.toUpperCase()} = {coinValue * calculatedData} {coinTo.toUpperCase()}
					</p>
				</div>
			</div>
		);
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
		<>
			<div className="prices">
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
														<IoCalculator onClick={() => setConverter(true)} />
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
					{quickConverter()}
					<div className={`Overlay ${converter ? 'Show' : ''}`} onClick={() => setConverter(!converter)} />
				</div>
				<ToastContainer hideProgressBar autoClose={3000} />
			</div>
		</>
	);
};

export default Prices;
