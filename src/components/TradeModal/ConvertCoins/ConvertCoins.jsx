import { RotateSpinner } from 'react-spinners-kit';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './ConvertCoins.scss';
import { RiArrowUpDownFill } from 'react-icons/ri';

const ConvertCoins = ({
	modalUpConvert,
	coin,
	setModalUpConvert,
	setTradeModal,
	tradeModal,
	setCoin,
	coinInfo,
	user,
	wallet,
	balance,
}) => {
	const apiURL = 'https://api.apexwallet.app/v1';
	const [amountToConvert, setAmountToConvert] = useState(0.01);
	const [proceed, setProceed] = useState(false);
	const [vibrate, setVibrate] = useState(false);
	const [converting, setConverting] = useState(false);
	const [coinTo, setCoinTo] = useState('ethereum');
	const [convertPrice, setConvertPrice] = useState(null);
	const seconds = useRef(30);
	const [time, setTime] = useState(30);
	let isRendered = useRef(false);

	//change between coinFrom
	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	//change between coinTo
	const handleChangeTo = (event) => {
		setCoinTo(event.target.value);
	};

	//switch coinFrom and coinTo
	const switchCoins = () => {
		setCoin(coinTo);
		setCoinTo(coin);
	};

	//get the convert price from apexwallet API
	useEffect(() => {
		isRendered.current = true;
		let interval;
		const getPrice = { coinFrom: coin, coinTo: coinTo, amount: amountToConvert };

		async function updatePrice() {
			try {
				await axios
					.post(`${apiURL}/coin/convertPrice`, getPrice, { withCredentials: true })
					.then((res) => {
						if (isRendered.current === true) {
							setConvertPrice(res.data);
						} else {
							return null;
						}
					})
					.catch(async (err) => {
						await toast.error(`${err.response.data}`, {
							hideProgressBar: true,
						});
					});
			} catch (err) {
				console.error(err);
			}
		}

		updatePrice();

		if (proceed === true) {
			interval = setInterval(() => {
				if (seconds.current === 0) {
					seconds.current = 29;
					setTime(seconds.current);
					updatePrice();
				} else {
					seconds.current = seconds.current - 1;
					setTime(seconds.current);
				}
			}, 1000);
		} else {
			seconds.current = 29;
			setTime(seconds.current);
		}

		return () => {
			clearInterval(interval);
			isRendered.current = false;
		};
	}, [proceed, amountToConvert, coin, coinTo, seconds]);

	//buy coin
	const handleConvertCoin = async (e) => {
		e.preventDefault();
		setConverting(true);

		if (amountToConvert <= 0) {
			toast.error(`You can't convert below 0 ${coinInfo.symbol.toUpperCase()}`, {
				hideProgressBar: true,
			});
			setConverting(false);
		} else if (amountToConvert > balance) {
			toast.error(`You have ${balance} ${coinInfo.symbol.toUpperCase()} you can't convert more than that.`, {
				hideProgressBar: true,
			});
			setConverting(false);
		} else {
			let convert = { coinFrom: coin, coinTo: coinTo, amount: amountToConvert };
			try {
				await axios
					.post(`${apiURL}/coin/convert`, convert, { withCredentials: true })
					.then((res) => {
						if (res.status === 200) {
							setModalUpConvert(!modalUpConvert);
							setTradeModal(!tradeModal);
							toast.success(`Success 🚀`, {
								hideProgressBar: true,
							});
						}
					})
					.catch(async (err) => {
						await toast.error(`${err.response.data}`, {
							hideProgressBar: true,
						});
					});
			} catch (error) {
				console.log('Error: ', error);
			}
			setConverting(false);
		}
	};

	//try to vibrate the input
	const vibrateInput = () => {
		setVibrate(true);
		setTimeout(() => {
			setVibrate(false);
		}, 500);
	};

	const convertCoinsFunction = () => {
		if (coinInfo !== null && user !== null && wallet !== null) {
			return (
				<>
					<p className="header">
						Convert{' '}
						<span style={{ textTransform: 'capitalize' }}>{coinInfo.name ? coinInfo.name : coin}</span>
					</p>
					{proceed ? (
						<div className="convertContainer">
							<div className="from">
								<p>CONVERT</p>
								<p>
									{amountToConvert} <span>{coinInfo.symbol.toUpperCase()}</span>
								</p>
							</div>
							<div className="to">
								<p>TO</p>
								<p>
									{convertPrice && convertPrice.price}{' '}
									<span>{convertPrice && convertPrice.symbol}</span>
								</p>
							</div>

							<div className="refreshesIn">
								<p>
									Refreshes in: <span>{time} seconds</span>
								</p>
							</div>
						</div>
					) : (
						<div className="input">
							<span>{coinInfo.symbol.toUpperCase()}</span>
							<input
								style={{
									animation: vibrate && 'vibrateInput .5s ease forwards',
								}}
								value={amountToConvert}
								onChange={(e) => {
									amountToConvert.toString().length <= 7 && setAmountToConvert(e.target.value);
									amountToConvert.toString().length >= 8 &&
										setAmountToConvert(
											amountToConvert
												.toString()
												.substring(0, e.target.value.toString().length - 0)
										);

									amountToConvert.toString().length >= 8 && vibrateInput();
								}}
								type="number"
								pattern="[-+]?[0-9]*[.,]?[0-9]+"
								formNoValidate="formnovalidate"
								step="any"
								min="0"
								max={balance}
								placeholder="1"
							/>
							<div></div>
						</div>
					)}
					<div className="selectBalanceAndBTN">
						{proceed ? null : (
							<div className="selectCoins">
								<Select className="selectCoin" value={coin} onChange={handleChange}>
									<MenuItem value={'bitcoin'}>BTC</MenuItem>
									<MenuItem value={'ethereum'}>ETH</MenuItem>
									<MenuItem value={'ethereum-classic'}>ETC</MenuItem>
									<MenuItem value={'litecoin'}>LTC</MenuItem>
									<MenuItem value={'dogecoin'}>DOGE</MenuItem>
									<MenuItem value={'ripple'}>XRP</MenuItem>
									<MenuItem value={'tether'}>USDT</MenuItem>
									<MenuItem value={'binancecoin'}>BNB</MenuItem>
									<MenuItem value={'cardano'}>ADA</MenuItem>
									<MenuItem value={'usd-coin'}>USDC</MenuItem>
									<MenuItem value={'tron'}>TRX</MenuItem>
									<MenuItem value={'bitcoin-cash'}>BCH</MenuItem>
									<MenuItem value={'polkadot'}>DOT</MenuItem>
									<MenuItem value={'uniswap'}>UNI</MenuItem>
									<MenuItem value={'dash'}>DASH</MenuItem>
									<MenuItem value={'decentraland'}>MANA</MenuItem>
									<MenuItem value={'shiba-inu'}>SHIB</MenuItem>
									<MenuItem value={'stellar'}>XLM</MenuItem>
									<MenuItem value={'chainlink'}>LINK</MenuItem>
									<MenuItem value={'solana'}>SOL</MenuItem>
								</Select>
								<div className="switchCoins">
									<RiArrowUpDownFill onClick={() => switchCoins()} />
								</div>
								<Select className="selectCoin" value={coinTo} onChange={handleChangeTo}>
									<MenuItem value={'bitcoin'}>BTC</MenuItem>
									<MenuItem value={'ethereum'}>ETH</MenuItem>
									<MenuItem value={'ethereum-classic'}>ETC</MenuItem>
									<MenuItem value={'litecoin'}>LTC</MenuItem>
									<MenuItem value={'dogecoin'}>DOGE</MenuItem>
									<MenuItem value={'ripple'}>XRP</MenuItem>
									<MenuItem value={'tether'}>USDT</MenuItem>
									<MenuItem value={'binancecoin'}>BNB</MenuItem>
									<MenuItem value={'cardano'}>ADA</MenuItem>
									<MenuItem value={'usd-coin'}>USDC</MenuItem>
									<MenuItem value={'tron'}>TRX</MenuItem>
									<MenuItem value={'bitcoin-cash'}>BCH</MenuItem>
									<MenuItem value={'polkadot'}>DOT</MenuItem>
									<MenuItem value={'uniswap'}>UNI</MenuItem>
									<MenuItem value={'dash'}>DASH</MenuItem>
									<MenuItem value={'decentraland'}>MANA</MenuItem>
									<MenuItem value={'shiba-inu'}>SHIB</MenuItem>
									<MenuItem value={'stellar'}>XLM</MenuItem>
									<MenuItem value={'chainlink'}>LINK</MenuItem>
									<MenuItem value={'solana'}>SOL</MenuItem>
								</Select>
							</div>
						)}
						<div className="coinAndWalletTab">
							{proceed ? null : (
								<div>
									<p>{coinInfo.symbol.toUpperCase()} balance</p>{' '}
									<span>
										{parseFloat(balance).toFixed(5)} {coinInfo.symbol.toUpperCase()}
									</span>
								</div>
							)}
							{proceed ? (
								<>
									<button
										//disable the "Proceed Button" if the requirements are not met.
										disabled={converting ? true : false}
										onClick={(e) => handleConvertCoin(e)}
									>
										<p>Convert</p>
									</button>
									<p
										className="cancelButton"
										onClick={() => {
											setProceed(false);
										}}
									>
										<span>Cancel</span>
									</p>
								</>
							) : (
								<button
									//disable the "Proceed Button" if the requirements are not met.
									disabled={
										amountToConvert <= 0 || amountToConvert > balance || coin === coinTo
											? true
											: false
									}
									onClick={() => {
										setProceed(true);
									}}
								>
									<p>Proceed</p>
								</button>
							)}
						</div>
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

	return (
		<>
			<div className={`convertCoins ${modalUpConvert ? 'Show' : ''}`}>
				<div
					onClick={() => {
						proceed ? setProceed(false) : setModalUpConvert(!modalUpConvert);
						setProceed(false);
					}}
					className="closeIcon"
				>
					<IoClose />
				</div>
				<div className="convertForm">{convertCoinsFunction()}</div>
			</div>
		</>
	);
};

export default ConvertCoins;
