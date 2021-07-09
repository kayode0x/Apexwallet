import { RotateSpinner } from 'react-spinners-kit';
import { IconContext } from 'react-icons';
import { BsStarFill, BsStar, BsLink45Deg } from 'react-icons/bs';
import TradeTab from './TradeTab/TradeTab';
import Graph from './Graph/Graph';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CompleteCoin = ({ coinInfo, user, watchingCoin, triggerWatchCoin, matches, wallet, balance, coinSearchId }) => {
	//initialize the array that stores the graph data
	let arr = [];
	//api endpoint to get the coin chart.
	const [days, setDays] = useState(1);
	const coingeckoApi = `https://api.coingecko.com/api/v3/coins/${coinSearchId}/market_chart?vs_currency=usd&days=${days}&interval=1m`;
	const [data, setData] = useState(null);
	const [graphData, setGraphData] = useState(null);
	const max = 'max';

	// load the graph
	useEffect(() => {
		try {
			fetch(coingeckoApi, {
				headers: {
					'content-type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => setData(data.prices));
		} catch (error) {
			console.log('ERROR: ', error);
		}
	}, [coingeckoApi]);

	useEffect(() => {
		//run this once to prevent render looping
		if (data !== null) {
			data.forEach((item) => {
				//create a new object for each item in the array since recharts uses them
				let newGraphDataX = {
					name: `${coinSearchId}`,
					date: item[0],
					price: parseFloat(item[1]).toFixed(2),
				};

				arr.push(newGraphDataX);
			});
			setGraphData(arr);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, coinSearchId]);

	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};

	//since shiba inu has problems with the graph, alert the user.
	useEffect(() => {
		const customId = 'custom-id-yes';
		if (graphData !== null && coinSearchId === 'shiba-inu') {
			toast.error(`${coinSearchId} has problems with the graph, this problem is from the API provider.`, {
				toastId: customId,
			});
		}
	}, [graphData, coinSearchId]);

	const balanceFunction = () => {
		if (user.isActive === false) {
			return (
				<div>
					<p>Verify your account before trading {coinInfo.name}</p>
				</div>
			);
		} else if (user.isActive === true) {
			return (
				<div>
					<img src={coinInfo.image.large} alt={coinInfo.id} />
					<p>
						<span>{coinInfo.symbol.toUpperCase()}</span> Balance
					</p>
					<p>
						<span>${parseFloat(balance * coinInfo.market_data.current_price.usd).toFixed(2)}</span>
						<span>
							{parseFloat(balance).toFixed(5)} {coinInfo.symbol.toUpperCase()}
						</span>
					</p>
				</div>
			);
		}
	};

	if (coinInfo !== null && user !== null && wallet !== null) {
		return (
			<>
				<div className="graphDiv">
					<Graph coinInfoId={coinInfo.id} days={days} graphData={graphData} coinSearchId={coinSearchId} />
					<div className="currentPriceAndPercentage">
						<p className="currentPrice">${formatNumber(coinInfo.market_data.current_price.usd)}</p>
						<p
							style={{
								color:
									coinInfo.market_data.price_change_24h_in_currency.usd < 0 ? '#FF1B1C' : '#68df44',
							}}
							className="currentPercentage"
						>
							<span>{coinInfo.market_data.price_change_percentage_24h < 0 ? '' : '+'}</span>
							{Math.round((coinInfo.market_data.price_change_percentage_24h + Number.EPSILON) * 100) /
								100}
							%
						</p>
					</div>
					<div className="watchIcons" style={{ color: watchingCoin ? '#FDCA40' : '#5d5c5f' }}>
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
						<div onClick={() => setDays(1)} className={days === 1 ? 'active' : ''}>
							1D
						</div>
						<div onClick={() => setDays(7)} className={days === 7 ? 'active' : ''}>
							1W
						</div>
						<div onClick={() => setDays(30)} className={days === 30 ? 'active' : ''}>
							1M
						</div>
						<div onClick={() => setDays(365)} className={days === 365 ? 'active' : ''}>
							1Y
						</div>
						<div onClick={() => setDays(max)} className={days === max ? 'active' : ''}>
							All
						</div>
					</div>
				</div>
				<div className="coinInformationContainer">
					{/* Balance function */}
					{matches && <div className="tradeCoinMobile">{balanceFunction()}</div>}

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
								<p>{coinInfo.description.en === '' ? 'No data available' : coinInfo.description.en}</p>
								<p>Resources</p>
								<span>
									<BsLink45Deg /> <a href={coinInfo.links.homepage[0]}>Official Website</a>
								</span>
							</div>
							<div className="tradeCoin">
								<TradeTab user={user} wallet={wallet} coinInfo={coinInfo} balance={balance} />
							</div>
						</div>
					)}
					{matches && (
						<div className="tradeCoinAndAboutCoinMobile">
							<div className="aboutCoinMobile">
								<p>{coinInfo.description.en === '' ? 'No data available' : coinInfo.description.en}</p>
								<p>Resources</p>
								<span>
									<BsLink45Deg /> <a href={coinInfo.links.homepage[0]}>Official Website</a>
								</span>
							</div>
						</div>
					)}
				</div>
			</>
		);
	} else {
		return (
			<div className="loading">
				<RotateSpinner size={40} color="#080809" />
			</div>
		);
	}
};

export default CompleteCoin;
