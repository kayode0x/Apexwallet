import { RotateSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const SellCoins = ({ newCoinInfo, user, wallet, coin, setCoin, balance }) => {
	const [type, setType] = useState('fiat');

	//selling.
	const [amountToSellFiat, setAmountToSellFiat] = useState(2);
	const [amountToSellCrypto, setAmountToSellCrypto] = useState(0.01);
	const [selling, setSelling] = useState(false);
	const [vibrate, setVibrate] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	//switch the way the user wants to buy coins, fiat or crypto
	const handleTypeChange = () => {
		if (type === 'fiat') {
			setType('crypto');
		} else if (type === 'crypto') {
			setType('fiat');
		}
	};

	//sell methods.
	const coinAmountToSellCrypto = (amountToSellCrypto) => {
		return parseFloat(amountToSellCrypto * newCoinInfo.market_data.current_price.usd).toFixed(2);
	};
	const coinAmountToSellFiat = (amountToSellFiat) => {
		return parseFloat(amountToSellFiat / newCoinInfo.market_data.current_price.usd).toFixed(5);
	};

	//get the value of the amount to sell in fiat
	const convertedAmountSell = () =>
		Number(parseFloat(amountToSellFiat / newCoinInfo.market_data.current_price.usd).toFixed(6));

	//sell coin
	const handleSellCoin = async (e) => {
		e.preventDefault();
		setSelling(true);

		//first check the 'type' for necessary values
		if (type === 'fiat') {
			if (convertedAmountSell() > parseFloat(balance).toFixed(5)) {
				toast.error(
					`You have ${parseFloat(balance).toFixed(
						5
					)} ${newCoinInfo.symbol.toUpperCase()}, you can't sell more than that`,
					{
						hideProgressBar: true,
					}
				);
				setSelling(false);
			} else if (amountToSellFiat < 1) {
				toast.error(`You can only sell a minimum of $1 worth of ${newCoinInfo.symbol.toUpperCase()}`, {
					hideProgressBar: true,
				});
				setSelling(false);
			} else {
				let purchase = { coin: newCoinInfo.id, amount: convertedAmountSell() };
				try {
					await axios
						.post(`${apiURL}/coin/sell`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
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
				setSelling(false);
			}
		} else if (type === 'crypto') {
			if (amountToSellCrypto < parseFloat(2 / newCoinInfo.market_data.current_price.usd).toFixed(6)) {
				toast.error(
					`You can only sell a minimum of $2 ≈ ${parseFloat(
						2 / newCoinInfo.market_data.current_price.usd
					).toFixed(6)} ${newCoinInfo.symbol.toUpperCase()}`,
					{
						hideProgressBar: true,
					}
				);
				setSelling(false);
			} else if (amountToSellCrypto > balance) {
				toast.error(
					`You have ${parseFloat(balance).toFixed(
						5
					)} ${newCoinInfo.symbol.toUpperCase()}, you can't sell more than that`,
					{
						hideProgressBar: true,
					}
				);
				setSelling(false);
			} else {
				let purchase = { coin: newCoinInfo.id, amount: amountToSellCrypto };
				try {
					await axios
						.post(`${apiURL}/coin/sell`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
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
				setSelling(false);
			}
		}
	};

	//try to vibrate the input
	const vibrateInput = () => {
		setVibrate(true);
		setTimeout(() => {
			setVibrate(false);
		}, 500);
	};

	if (newCoinInfo !== null && user !== null && wallet !== null) {
		return (
			<>
				<div className="input">
					{type === 'fiat' ? (
						<>
							<span>USD</span>
							<input
								style={{
									animation: vibrate && 'vibrateInput .5s ease forwards',
								}}
								value={amountToSellFiat}
								onChange={(e) => {
									amountToSellFiat.toString().length <= 7 && setAmountToSellFiat(e.target.value);
									amountToSellFiat.toString().length >= 8 &&
										setAmountToSellFiat(
											amountToSellFiat
												.toString()
												.substring(0, e.target.value.toString().length - 0)
										);

									amountToSellFiat.toString().length >= 8 && vibrateInput();
								}}
								placeholder="1"
								type="number"
								step="any"
								pattern="[-+]?[0-9]*[.,]?[0-9]+"
								formNoValidate="formnovalidate"
							/>
						</>
					) : (
						<>
							<span style={{ textTransform: 'uppercase' }}>{newCoinInfo.symbol}</span>
							<input
								style={{
									animation: vibrate && 'vibrateInput .5s ease forwards',
								}}
								value={amountToSellCrypto}
								onChange={(e) => {
									amountToSellCrypto.toString().length <= 7 && setAmountToSellCrypto(e.target.value);
									amountToSellCrypto.toString().length >= 8 &&
										setAmountToSellCrypto(
											amountToSellCrypto
												.toString()
												.substring(0, e.target.value.toString().length - 0)
										);

									amountToSellCrypto.toString().length >= 8 && vibrateInput();
								}}
								placeholder="0"
								type="number"
								step="any"
								pattern="[-+]?[0-9]*[.,]?[0-9]+"
								formNoValidate="formnovalidate"
							/>
						</>
					)}
					<div>
						<BsArrowUpDown onClick={handleTypeChange} />
					</div>
				</div>

				<p className="amountYouGet">
					{type === 'crypto' ? (
						<> ${coinAmountToSellCrypto(amountToSellCrypto)} </>
					) : (
						<>
							{coinAmountToSellFiat(amountToSellFiat)} {newCoinInfo.symbol.toUpperCase()}{' '}
						</>
					)}
				</p>
				<div className="selectBalanceAndBTN">
					<Select className="selectCoin" value={coin} onChange={handleChange}>
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
					<div className="coinAndWalletTab">
						<div>
							<p>
								<span style={{ textTransform: 'uppercase' }}>{newCoinInfo.symbol}</span> balance
							</p>{' '}
							<span style={{ textTransform: 'uppercase' }}>
								{parseFloat(balance).toFixed(5)} {newCoinInfo.symbol}
							</span>
						</div>
						<button
							//disable the "Buy Button" if the requirements are not met.
							disabled={
								selling || type === 'fiat'
									? convertedAmountSell() > balance || amountToSellFiat < 2
									: Number(amountToSellCrypto) > balance ||
									  Number(amountToSellCrypto) <
											parseFloat(2 / newCoinInfo.market_data.current_price.usd).toFixed(6)
									? true
									: false
							}
							onClick={(e) => handleSellCoin(e)}
						>
							{selling ? (
								<p>Selling...</p>
							) : (
								<p>
									Sell <span style={{ textTransform: 'capitalize' }}>{newCoinInfo.name}</span>
								</p>
							)}
						</button>
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

export default SellCoins;
