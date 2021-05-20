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
	const [amountToBuyCrypto, setAmountToBuyCrypto] = useState(0);
	const [amountToSellFiat, setAmountToSellFiat] = useState(1);
	const [amountToSellCrypto, setAmountToSellCrypto] = useState(0);
	const [buyType, setBuyType] = useState('fiat');
	const [sellType, setSellType] = useState('fiat');
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const [buying, setBuying] = useState(false);
	// const [selling, setSelling] = useState(false);

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
		return parseFloat(amountToBuyFiat / coinInfo.market_data.current_price.usd).toFixed(6);
	};

	//buy coin
	const handleBuyCoin = async (e) => {
		e.preventDefault();
		setBuying(true);

		//first check the 'buy type' for necessary values
		if (buyType === 'fiat') {
			console.log(amountToBuyFiat);
			if (amountToBuyFiat < 10) {
				toast.dark(`You can only buy a minimum of $10 worth of ${coinInfo.symbol.toUpperCase()}`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setBuying(false);
			} else if (amountToBuyFiat > wallet.balance) {
				toast.dark(`Your USD balance is $${wallet.balance}, you can't buy more than that`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setBuying(false);
			} else {
				let purchase = {coin: coinInfo.id, amount: amountToBuyFiat, type: 'buy'};
				try {
					await axios.post(`${apiURL}/coin`, purchase, { withCredentials: true }).then(res => {console.log("DATA: ", res.data)})
				} catch (error) {
					console.log('Error: ', error);
				}
				setBuying(false);
			}
		}
	};

	//sell coin
	const handleSellCoin = (e) => {
		e.preventDefault();
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
									min="0"
									placeholder="0"
								/>
							</>
						)}
						<div>
							<BsArrowUpDown onClick={handleBuyTypeChange} />
						</div>
					</div>
					<p className="amountYouGet">
						You get {coinAmountToBuy(amountToBuyFiat)} {coinInfo.symbol.toUpperCase()}
					</p>
					<div className="coinAndWalletTab">
						<div>
							<p>USD balance</p> <span>${wallet.balance}</span>
						</div>
						<button disabled={buying ? true : false} type="submit">
							{buying ? (
								<p>Processing...</p>
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
								{balance} {coinInfo.symbol} ≈ ${balance * coinInfo.market_data.current_price.usd}
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
									min="1"
									max="5000"
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
									min="0"
									placeholder="0"
								/>
							</>
						)}
						<div>
							<BsArrowUpDown onClick={handleSellTypeChange} />
						</div>
					</div>

					<div className="coinAndWalletTab">
						<div>
							<p>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span> balance
							</p>{' '}
							<span style={{ textTransform: 'uppercase' }}>
								{balance} {coinInfo.symbol}
							</span>
						</div>
						<button type="submit">
							SELL <span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
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
				<form onSubmit={handleBuyCoin} className="buyCoins">
					{buyCoinsFunction()}
				</form>
			</TabPanel>

			{/* Sell coin tab */}
			<TabPanel value={value} index={1}>
				<form onSubmit={handleSellCoin} className="sellCoins">
					{sellCoinsFunction()}
				</form>
			</TabPanel>
		</Box>
	);
}
