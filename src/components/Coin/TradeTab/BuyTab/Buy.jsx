import { RotateSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const BuyCoins = ({ newCoinInfo, user, wallet, coin, setCoin }) => {
	//buying.
	const [amountToBuyFiat, setAmountToBuyFiat] = useState(1);
	const [amountToBuyCrypto, setAmountToBuyCrypto] = useState(0);
	const [type, setType] = useState('fiat');
	const [vibrate, setVibrate] = useState(false);
	const [buying, setBuying] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';

	//buy methods
	const coinAmountToBuy = (amountToBuyFiat) => {
		return parseFloat(amountToBuyFiat / newCoinInfo.market_data.current_price.usd).toFixed(5);
	};
	const coinAmountToBuyCrypto = (amountToBuyCrypto) => {
		return parseFloat(amountToBuyCrypto * newCoinInfo.market_data.current_price.usd).toFixed(2);
	};

	const convertedAmount = () => parseFloat(amountToBuyCrypto * newCoinInfo.market_data.current_price.usd).toFixed(5);

	//switch the way the user wants to buy coins, fiat or crypto
	const handleTypeChange = () => {
		if (type === 'fiat') {
			setType('crypto');
		} else if (type === 'crypto') {
			setType('fiat');
		}
	};

	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	//try to vibrate the input
	const vibrateInput = () => {
		setVibrate(true);
		setTimeout(() => {
			setVibrate(false);
		}, 500);
	};

	//onChange multiple state change
	const onChangeMultiple = (e) => {
		setAmountToBuyFiat(e.target.value);
		coinAmountToBuy(amountToBuyFiat);
	};

	//buy coin
	const handleBuyCoin = async (e) => {
		e.preventDefault();
		setBuying(true);

		//first check the 'buy type' for necessary values
		if (type === 'fiat') {
			if (amountToBuyFiat < 2) {
				toast.error(`You can only buy a minimum of $2 worth of ${newCoinInfo.symbol.toUpperCase()}`, {
					hideProgressBar: true,
				});
				setBuying(false);
			} else if (amountToBuyFiat > wallet.balance) {
				toast.error(
					`Your USD balance is $${parseFloat(wallet.balance).toFixed(2)}, you can't buy more than that`,
					{
						hideProgressBar: true,
					}
				);
				setBuying(false);
			} else {
				let purchase = { coin: newCoinInfo.id, amount: amountToBuyFiat };
				try {
					await axios
						.post(`${apiURL}/coin/buy`, purchase, { withCredentials: true })
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
				setBuying(false);
			}
		} else if (type === 'crypto') {
			if (amountToBuyCrypto < 0) {
				toast.error(
					`You can only buy a minimum of $2 ≈ ${parseFloat(
						2 / newCoinInfo.market_data.current_price.usd
					).toFixed(2)} ${newCoinInfo.symbol.toUpperCase()}`,
					{
						hideProgressBar: true,
					}
				);
				setBuying(false);
			} else if (convertedAmount() < parseFloat(2 / newCoinInfo.market_data.current_price.usd).toFixed(5)) {
				toast.error(
					`You can only buy a minimum of $2 ≈ ${parseFloat(
						2 / newCoinInfo.market_data.current_price.usd
					).toFixed(6)} ${newCoinInfo.symbol.toUpperCase()}`,
					{
						hideProgressBar: true,
					}
				);
				setBuying(false);
			} else if (convertedAmount() > wallet.balance) {
				toast.error(
					`Your USD balance is $${parseFloat(wallet.balance).toFixed(2)}, you can't buy more than that`,
					{
						hideProgressBar: true,
					}
				);
				setBuying(false);
			} else {
				let purchase = { coin: newCoinInfo.id, amount: convertedAmount() };
				try {
					await axios
						.post(`${apiURL}/coin/buy`, purchase, { withCredentials: true })
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
				setBuying(false);
			}
		}
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
								value={amountToBuyFiat}
								onChange={(e) => {
									amountToBuyFiat.toString().length <= 7 && onChangeMultiple(e);
									amountToBuyFiat.toString().length >= 8 &&
										setAmountToBuyFiat(
											amountToBuyFiat
												.toString()
												.substring(0, e.target.value.toString().length - 0)
										);

									amountToBuyFiat.toString().length >= 8 && vibrateInput();
								}}
								type="number"
								pattern="[-+]?[0-9]*[.,]?[0-9]+"
								formNoValidate="formnovalidate"
								step="any"
								min="1"
								max="5000"
								placeholder="1"
							/>
						</>
					) : (
						<>
							<span style={{ textTransform: 'uppercase' }}>{newCoinInfo.symbol}</span>
							<input
								style={{
									animation: vibrate && 'vibrateInput .5s ease forwards',
								}}
								value={amountToBuyCrypto}
								onChange={(e) => {
									amountToBuyCrypto.toString().length <= 7 && setAmountToBuyCrypto(e.target.value);
									amountToBuyCrypto.toString().length >= 8 &&
										setAmountToBuyCrypto(
											amountToBuyCrypto
												.toString()
												.substring(0, e.target.value.toString().length - 0)
										);

									amountToBuyCrypto.toString().length >= 8 && vibrateInput();
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
					{type === 'fiat' ? (
						<>
							{coinAmountToBuy(amountToBuyFiat)} {newCoinInfo.symbol.toUpperCase()}
						</>
					) : (
						<>${coinAmountToBuyCrypto(amountToBuyCrypto)}</>
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
							<p>USD balance</p> <span>${parseFloat(wallet.balance).toFixed(2)}</span>
						</div>
						<button
							//disable the "Buy Button" if the requirements are not met.
							disabled={
								buying || type === 'fiat'
									? amountToBuyFiat < 2 || amountToBuyFiat > wallet.balance
									: amountToBuyCrypto <= 0 || convertedAmount() > wallet.balance
									? true
									: false
							}
							onClick={(e) => handleBuyCoin(e)}
						>
							{buying ? (
								<p>Buying...</p>
							) : (
								<p>
									Buy <span style={{ textTransform: 'capitalize' }}>{newCoinInfo.name}</span>
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

export default BuyCoins;
