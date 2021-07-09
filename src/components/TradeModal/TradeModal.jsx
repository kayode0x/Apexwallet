import { BiMinus, BiPlus } from 'react-icons/bi';
import { BsArrowRepeat, BsArrowDownLeft, BsArrowUpRight } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BuyCoins from './BuyCoins/BuyCoins';
import SellCoins from './SellCoins/SellCoins';
import Send from './SendxReceive/Send';
import Receive from './SendxReceive/Receive';
import ConvertCoins from './ConvertCoins/ConvertCoins';

const TradeModal = ({ tradeModal, setTradeModal }) => {
	const [wallet, setWallet] = useState(null);
	const [balance, setBalance] = useState(null);
	const [address, setAddress] = useState(null);
	const [user, setUser] = useState(null);
	const [coinInfo, setCoinInfo] = useState(null);
	const [coin, setCoin] = useState('bitcoin');
	let isRendered = useRef(false);
	const [modalUpBuy, setModalUpBuy] = useState(false);
	const [modalUpSell, setModalUpSell] = useState(false);
	const [modalUpSend, setModalUpSend] = useState(false);
	const [modalUpReceive, setModalUpReceive] = useState(false);
	const [modalUpConvert, setModalUpConvert] = useState(false);

	//ALL URLS HERE
	//api endpoint to get the coin data.
	const coingeckoDataApi = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;

	//global api for Apexwallet.
	const apiURL = 'https://api.apexwallet.app/v1';

	useEffect(() => {
		isRendered.current = true;
		async function load() {
			try {
				let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
					await toast.error(`${err.response.data}`, {
						hideProgressBar: true,
					});
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
					await toast.error(err.response.data, {
						hideProgressBar: true,
					});
				});
				if (isRendered.current === true) {
					setWallet(wallet.data);
				} else {
					return null;
				}
			} catch (error) {
				console.log('ERROR2: ', error);
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
							setCoinInfo(data);
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

	//get the current price from coin gecko then pass it into the coin the user is currently viewing
	useEffect(() => {
		async function callPrice() {
			let newCoinBalance;
			newCoinBalance = wallet.coins.filter((coin) => coin.coin === coinInfo.id);
			if (newCoinBalance[0] === undefined) {
				setBalance(0);
			} else {
				setBalance(newCoinBalance[0].balance);
				setAddress(newCoinBalance[0]._id);
			}
		}
		if (user !== null && user.isActive === true && wallet !== null && coinInfo !== null) {
			callPrice(); //only call this function if the user is active and has a wallet
		}
	}, [coinInfo, user, wallet]);

	function showTab() {
		if (user !== null && user.isActive === true) {
			return (
				<>
					<div className="buyCrypto" onClick={() => setModalUpBuy(!modalUpBuy)}>
						<div className="tradeModalIcon">
							<BiPlus />
						</div>
						Buy
					</div>
					<div className="sellCrypto" onClick={() => setModalUpSell(!modalUpSell)}>
						<div className="tradeModalIcon">
							<BiMinus />
						</div>
						Sell
					</div>
					<div className="convertCrypto" onClick={() => setModalUpConvert(!modalUpConvert)}>
						<div className="tradeModalIcon">
							<BsArrowRepeat />
						</div>
						Convert
					</div>
					<div className="sendCrypto" onClick={() => setModalUpSend(!modalUpSend)}>
						<div className="tradeModalIcon">
							<BsArrowUpRight />
						</div>
						Send
					</div>
					<div className="receiveCrypto" onClick={() => setModalUpReceive(!modalUpReceive)}>
						<div className="tradeModalIcon">
							<BsArrowDownLeft />
						</div>
						Receive
					</div>

					<BuyCoins
						tradeModal={tradeModal}
						setTradeModal={setTradeModal}
						modalUpBuy={modalUpBuy}
						setCoin={setCoin}
						setModalUpBuy={setModalUpBuy}
						coin={coin}
						coinInfo={coinInfo}
						user={user}
						wallet={wallet}
						balance={balance}
					/>

					<SellCoins
						tradeModal={tradeModal}
						setTradeModal={setTradeModal}
						modalUpSell={modalUpSell}
						setCoin={setCoin}
						setModalUpSell={setModalUpSell}
						coin={coin}
						coinInfo={coinInfo}
						user={user}
						wallet={wallet}
						balance={balance}
					/>

					<Send
						tradeModal={tradeModal}
						setTradeModal={setTradeModal}
						modalUpSend={modalUpSend}
						setCoin={setCoin}
						setModalUpSend={setModalUpSend}
						coin={coin}
						coinInfo={coinInfo}
						user={user}
						wallet={wallet}
						balance={balance}
					/>

					<Receive
						modalUpReceive={modalUpReceive}
						setModalUpReceive={setModalUpReceive}
						setCoin={setCoin}
						coin={coin}
						coinInfo={coinInfo}
						user={user}
						wallet={wallet}
						address={address}
					/>

					<ConvertCoins
						tradeModal={tradeModal}
						setTradeModal={setTradeModal}
						modalUpConvert={modalUpConvert}
						setModalUpConvert={setModalUpConvert}
						setCoin={setCoin}
						coin={coin}
						coinInfo={coinInfo}
						user={user}
						wallet={wallet}
						balance={balance}
					/>
				</>
			);
		} else if (user !== null && user.isActive === false) {
			return <p className="noWallet">Only verified users can trade.</p>;
		}
	}

	return <div className={`tradeModal ${tradeModal ? 'Show' : ''}`}>{showTab()}</div>;
};

export default TradeModal;
