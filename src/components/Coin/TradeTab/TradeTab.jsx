import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { BsArrowUpDown } from 'react-icons/bs';

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

export default function TradeTab({ user, wallet, coinInfo }) {
	const [value, setValue] = useState(0);
	const [amountToBuyFiat, setAmountToBuyFiat] = useState(1);
	const [amountToBuyCrypto, setAmountToBuyCrypto] = useState(0);
	const [amountToSellFiat, setAmountToSellFiat] = useState(1);
	const [amountToSellCrypto, setAmountToSellCrypto] = useState(0);
	const [buyType, setBuyType] = useState('fiat');
    const [sellType, setSellType] = useState('fiat');
	const [buying, setBuying] = useState(false);
	const [selling, setSelling] = useState(false);
	const [converting, setConverting] = useState(false);

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

	//buy coin
	const handleBuyCoin = (e) => {
		e.preventDefault();
	};

    //sell coin
    const handleSellCoin = (e) => {
		e.preventDefault();
	};

    //convert coin
    const handleConvertCoin = (e) => {
        e.preventDefault();
    }

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					textColor="inherit"
					indicatorColor="primary"
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab style={{ fontWeight: 'bold' }} label="Buy" {...a11yProps(0)} />
					<Tab style={{ fontWeight: 'bold' }} label="Sell" {...a11yProps(1)} />
					<Tab style={{ fontWeight: 'bold' }} label="Convert" {...a11yProps(2)} />
				</Tabs>
			</Box>

			{/* Buy coins tab */}
			<TabPanel value={value} index={0}>
				<form onSubmit={handleBuyCoin} className="buyCoins">
					<div className="input">
						{buyType === 'fiat' ? (
							<>
								<span>$</span>
								<input
									value={amountToBuyFiat}
									onChange={(e) => setAmountToBuyFiat(e.target.value)}
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

					<div className="coinAndWalletTab">
						<div>
							<p>USD balance</p> <span>$0</span>
						</div>
						<button type="submit">
							BUY <span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
						</button>
						<div>
							<p>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span> balance
							</p>
							<span style={{ textTransform: 'uppercase' }}>0 {coinInfo.symbol} ≈ $0.00</span>
						</div>
					</div>
				</form>
			</TabPanel>

			{/* Sell coin tab */}
			<TabPanel value={value} index={1}>
				<form onSubmit={handleSellCoin} className="sellCoins">
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
							<span style={{ textTransform: 'uppercase' }}>0 {coinInfo.symbol}</span>
						</div>
						<button type="submit">
							SELL <span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
						</button>
					</div>
				</form>
			</TabPanel>

			{/* Convert coins tab */}
			<TabPanel value={value} index={2}>
				<p style={{ position: 'absolute', top: '50%', left:'50%', transform: 'translate(-50%, -50%)' }}>Coming Soon.</p>
			</TabPanel>
		</Box>
	);
}
