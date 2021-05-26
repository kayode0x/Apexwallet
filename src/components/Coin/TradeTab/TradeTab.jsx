import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { BsArrowUpDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function TradeTab({ user, wallet, coinInfo, balance }) {
	const [value, setValue] = useState(0);
	const [amountToBuyFiat, setAmountToBuyFiat] = useState(1);
	const [amountToBuyCrypto, setAmountToBuyCrypto] = useState('');
	const [amountToSellFiat, setAmountToSellFiat] = useState(1);
	const [amountToSellCrypto, setAmountToSellCrypto] = useState('');
	const [buyType, setBuyType] = useState('fiat');
	const [sellType, setSellType] = useState('fiat');
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const [buying, setBuying] = useState(false);
	const [selling, setSelling] = useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//switch the way the user wants to buy coins, fiat or crypto
	const handleBuyTypeChange = () => {
		if (buyType === 'fiat') {
			setBuyType('crypto');
		} else if (buyType === 'crypto') {
			setBuyType('fiat');
		}
	};

	const handleSellTypeChange = () => {
		if (sellType === 'fiat') {
			setSellType('crypto');
		} else if (sellType === 'crypto') {
			setSellType('fiat');
		}
	};

	const coinAmountToBuy = (amountToBuyFiat) => {
		return parseFloat(amountToBuyFiat / coinInfo.market_data.current_price.usd).toFixed(5);
	};
	const coinAmountToBuyCrypto = (amountToBuyCrypto) => {
		return parseFloat(amountToBuyCrypto * coinInfo.market_data.current_price.usd).toFixed(2);
	};

	const coinAmountToSellCrypto = (amountToSellCrypto) => {
		return parseFloat(amountToSellCrypto * coinInfo.market_data.current_price.usd).toFixed(2);
	};
	const coinAmountToSellFiat = (amountToSellFiat) => {
		return parseFloat(amountToSellFiat / coinInfo.market_data.current_price.usd).toFixed(5);
	};

	//buy coin
	const handleBuyCoin = async (e) => {
		e.preventDefault();
		setBuying(true);

		//first check the 'buy type' for necessary values
		if (buyType === 'fiat') {
			if (amountToBuyFiat < 2) {
				toast.dark(`You can only buy a minimum of $2 worth of ${coinInfo.symbol.toUpperCase()}`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setBuying(false);
			} else if (amountToBuyFiat > wallet.balance) {
				toast.dark(`Your USD balance is $${wallet.balance}, you can't buy more than that`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setBuying(false);
			} else {
				let purchase = { coin: coinInfo.id, amount: amountToBuyFiat, type: 'buy' };
				try {
					await axios
						.post(`${apiURL}/coin`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								toast.dark(`Success 🚀`, {
									position: toast.POSITION.TOP_CENTER,
								});
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}
							console.log('DATA: ', res.data);
						})
						.catch(async (err) => {
							//toastify ROCKS!!
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setBuying(false);
			}
		} else if (buyType === 'crypto') {
			let convertedAmount = parseFloat(amountToBuyCrypto * coinInfo.market_data.current_price.usd).toFixed(5);

			if (amountToBuyCrypto < 0) {
				toast.dark(
					`You can only buy a minimum of $2 ≈ ${parseFloat(
						2 / coinInfo.market_data.current_price.usd
					).toFixed(6)} ${coinInfo.symbol.toUpperCase()}`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setBuying(false);
			} else if (convertedAmount < parseFloat(2 / coinInfo.market_data.current_price.usd).toFixed(5)) {
				toast.dark(
					`You can only buy a minimum of $2 ≈ ${parseFloat(
						2 / coinInfo.market_data.current_price.usd
					).toFixed(6)} ${coinInfo.symbol.toUpperCase()}`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setBuying(false);
			} else if (convertedAmount > wallet.balance) {
				toast.dark(
					`Your USD balance is $${parseFloat(wallet.balance).toFixed(2)}, you can't buy more than that`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setBuying(false);
			} else {
				let purchase = { coin: coinInfo.id, amount: convertedAmount, type: 'buy' };
				try {
					await axios
						.post(`${apiURL}/coin`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								toast.dark(
									`Success 🚀`,
									{
										position: toast.POSITION.TOP_CENTER,
									}
								);
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}
						})
						.catch(async (err) => {
							//toastify ROCKS!!
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setBuying(false);
			}
		}
	};

	//sell coin
	const handleSellCoin = async (e) => {
		e.preventDefault();
		setSelling(true);

		//get the value of the amount to sell in fiat
		let convertedAmount = parseFloat(amountToSellFiat / coinInfo.market_data.current_price.usd).toFixed(6);

		//first check the 'buy type' for necessary values
		if (sellType === 'fiat') {
			if (convertedAmount > parseFloat(balance).toFixed(5)) {
				toast.dark(
					`Your ${coinInfo.symbol.toUpperCase()} balance is ${parseFloat(balance).toFixed(
						5
					)}, you can't sell more than that`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setSelling(false);
			} else if (amountToSellFiat < 1) {
				toast.dark(`You can only sell a minimum of $1 worth of ${coinInfo.symbol.toUpperCase()}`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setSelling(false);
			} else {
				let purchase = { coin: coinInfo.id, amount: convertedAmount, type: 'sell' };
				try {
					await axios
						.post(`${apiURL}/coin`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								toast.dark(`Success 🚀`, {
									position: toast.POSITION.TOP_CENTER,
								});
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}
							console.log('DATA: ', res.data);
						})
						.catch(async (err) => {
							//toastify ROCKS!!
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setSelling(false);
			}
		} else if (sellType === 'crypto') {

			if (amountToSellCrypto < parseFloat(2 / coinInfo.market_data.current_price.usd).toFixed(6)) {
				toast.dark(
					`You can only sell a minimum of $2 ≈ ${parseFloat(
						2 / coinInfo.market_data.current_price.usd
					).toFixed(6)} ${coinInfo.symbol.toUpperCase()}`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setSelling(false);
			} else if (amountToSellCrypto > balance) {
				toast.dark(
					`Your ${coinInfo.symbol.toUpperCase()} balance is ${parseFloat(balance).toFixed(
						5
					)}, you can't sell more than that`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setSelling(false);
			} else {
				let purchase = { coin: coinInfo.id, amount: amountToSellCrypto, type: 'sell' };
				try {
					await axios
						.post(`${apiURL}/coin`, purchase, { withCredentials: true })
						.then((res) => {
							if(res.status === 200){
								toast.dark(`Success 🚀`, {
									position: toast.POSITION.TOP_CENTER,
								});
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}
						})
						.catch(async (err) => {
							//toastify ROCKS!!
							await toast.dark(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setSelling(false);
			}
		}
	};

	//allow only verified users with a wallet to trade.
	const buyCoinsFunction = () => {
		if (user.wallet !== undefined) {
			return (
				<>
					<div className="input">
						{buyType === 'fiat' ? (
							<>
								<span>$</span>
								<input
									value={amountToBuyFiat}
									onChange={(e) => {
										coinAmountToBuy(amountToBuyFiat);
										setAmountToBuyFiat(e.target.value);
									}}
									type="number"
									min="1"
									max="5000"
									placeholder="1"
								/>
							</>
						) : (
							<>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
								<input
									value={amountToBuyCrypto}
									onChange={(e) => setAmountToBuyCrypto(e.target.value)}
									type="number"
									placeholder="0"
								/>
							</>
						)}
						<div>
							<BsArrowUpDown onClick={handleBuyTypeChange} />
						</div>
					</div>
					<p className="amountYouGet">
						{buyType === 'fiat' ? (
							<>
								You get {coinAmountToBuy(amountToBuyFiat)} {coinInfo.symbol.toUpperCase()}
							</>
						) : (
							<>You Pay ${coinAmountToBuyCrypto(amountToBuyCrypto)}</>
						)}
					</p>
					<div className="coinAndWalletTab">
						<div>
							<p>USD balance</p> <span>${parseFloat(wallet.balance).toFixed(2)}</span>
						</div>
						<button disabled={buying ? true : false} type="submit">
							{buying ? (
								<p>Buying...</p>
							) : (
								<p>
									BUY <span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
								</p>
							)}
						</button>
						<div>
							<p>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span> balance
							</p>
							<span style={{ textTransform: 'uppercase' }}>
								{parseFloat(balance).toFixed(5)} {coinInfo.symbol} ≈ $
								{parseFloat(balance * coinInfo.market_data.current_price.usd).toFixed(2)}
							</span>
						</div>
					</div>
				</>
			);
		} else if (user.wallet === undefined) {
			return <p className="noWalletTrade">Only available to users with a wallet</p>;
		}
	};

	const sellCoinsFunction = () => {
		if (user.wallet !== undefined) {
			return (
				<>
					<div className="input">
						{sellType === 'fiat' ? (
							<>
								<span>$</span>
								<input
									value={amountToSellFiat}
									onChange={(e) => setAmountToSellFiat(e.target.value)}
									type="number"
									placeholder="1"
								/>
							</>
						) : (
							<>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
								<input
									value={amountToSellCrypto}
									onChange={(e) => setAmountToSellCrypto(e.target.value)}
									type="number"
									placeholder="0"
								/>
							</>
						)}
						<div>
							<BsArrowUpDown onClick={handleSellTypeChange} />
						</div>
					</div>

					<p className="amountYouGet">
						{sellType === 'crypto' ? (
							<> You get ${coinAmountToSellCrypto(amountToSellCrypto)} </>
						) : (
							<>
								You Pay {coinAmountToSellFiat(amountToSellFiat)} {coinInfo.symbol.toUpperCase()}{' '}
							</>
						)}
					</p>
					<div className="coinAndWalletTab">
						<div>
							<p>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span> balance
							</p>{' '}
							<span style={{ textTransform: 'uppercase' }}>
								{parseFloat(balance).toFixed(5)} {coinInfo.symbol}
							</span>
						</div>
						<button disabled={selling ? true : false} type="submit">
							{selling ? (
								<p>Selling...</p>
							) : (
								<p>
									SELL <span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
								</p>
							)}
						</button>
					</div>
				</>
			);
		} else if (user.wallet === undefined) {
			return <p className="noWalletTrade">Only available to users with a wallet</p>;
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					style={{ position: 'relative', left: '20%', width: '70%' }}
					value={value}
					textColor="inherit"
					indicatorColor="primary"
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab style={{ fontWeight: 'bold' }} label="Buy" {...a11yProps(0)} />
					<Tab style={{ fontWeight: 'bold' }} label="Sell" {...a11yProps(1)} />
				</Tabs>
			</Box>

			{/* Buy coins tab */}
			<TabPanel value={value} index={0}>
				<form onSubmit={handleBuyCoin} className="buyCoinsDesktop">
					{buyCoinsFunction()}
				</form>
			</TabPanel>

			{/* Sell coin tab */}
			<TabPanel value={value} index={1}>
				<form onSubmit={handleSellCoin} className="sellCoinsDesktop">
					{sellCoinsFunction()}
				</form>
			</TabPanel>
		</Box>
	);
}
