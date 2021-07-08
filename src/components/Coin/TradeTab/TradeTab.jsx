import { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './TradeTab.scss';
import BuyCoins from './BuyTab/Buy';
import SellCoins from './SellTab/Sell';

const TradeTab = ({ coinInfo, user, wallet }) => {
	const [balance, setBalance] = useState(null);
	const [coin, setCoin] = useState(coinInfo.id);
	const [newCoinInfo, setNewCoinInfo] = useState(coinInfo);
	const [activeNav, setActiveNav] = useState('buy');
	let isRendered = useRef(false);

	const coingeckoDataApi = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;

	useEffect(() => {
		isRendered.current = true;
		async function load() {
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
							setNewCoinInfo(data);
						} else {
							return null;
						}
					});
			} catch (error) {
				console.log('ERROR: ' + error);
			}
		}

		load();

		return () => {
			isRendered.current = false;
		};
	}, [coingeckoDataApi, coin]);

	//get the balance
	useEffect(() => {
		async function callPrice() {
			let newCoinBalance;
			newCoinBalance = wallet.coins.filter((coin) => coin.coin === newCoinInfo.id);
			if (newCoinBalance[0] === undefined) {
				setBalance(0);
			} else {
				setBalance(newCoinBalance[0].balance);
			}
		}
		if (
			user !== null &&
			user.isActive === true &&
			(user.wallet !== undefined) & (wallet !== null) &&
			newCoinInfo !== null
		) {
			callPrice(); //only call this function if the user is active and has a wallet
		}
	}, [newCoinInfo, user, wallet]);

	return (
		<div className="tradeTab">
			<div className="nav">
				<div onClick={() => setActiveNav('buy')} className={activeNav === 'buy' ? 'active' : ''}>
					Buy
				</div>
				<div onClick={() => setActiveNav('sell')} className={activeNav === 'sell' ? 'active' : ''}>
					Sell
				</div>
			</div>
			{user.wallet !== undefined ? (
				<div className="form">
					{activeNav === 'buy' && (
						<BuyCoins newCoinInfo={newCoinInfo} user={user} wallet={wallet} coin={coin} setCoin={setCoin} />
					)}
					{activeNav === 'sell' && (
						<SellCoins
							newCoinInfo={newCoinInfo}
							user={user}
							wallet={wallet}
							coin={coin}
							setCoin={setCoin}
							balance={balance}
						/>
					)}
				</div>
			) : (
				<p>Please create a wallet to trade {coinInfo.name}</p>
			)}
		</div>
	);
};

export default TradeTab;
