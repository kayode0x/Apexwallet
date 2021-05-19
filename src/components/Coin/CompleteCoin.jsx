import { RotateSpinner } from 'react-spinners-kit';
import { IconContext } from 'react-icons';
import { BsStarFill, BsStar, BsLink45Deg } from 'react-icons/bs';
import TradeTab from './TradeTab/TradeTab';


const completeCoin = (coinInfo, asset, user, watchingCoin, triggerWatchCoin, matches, wallet) => {
	//convert the mega numbers
	const formatNumber = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
	};



	if (coinInfo !== null && asset !== null && user !== null) {
		return (
			<>
				<div className="graphDiv">
					<p className="graphGoesHere">GRAPH GOES HERE</p>
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
											<p>Before buying {coinInfo.name} please open a wallet.</p>
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
									<BsLink45Deg /> <a href={coinInfo.links.homepage[0]}>Official Website</a>
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

export default completeCoin;