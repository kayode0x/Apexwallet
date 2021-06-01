import { RotateSpinner } from 'react-spinners-kit';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './SellCoins.scss'

const SellCoins = ({ modalUpSell, coin, setModalUpSell, setCoin, coinInfo, user, wallet, balance }) => {
		const [amountToSellFiat, setAmountToSellFiat] = useState(1);
		const [amountToSellCrypto, setAmountToSellCrypto] = useState('');
		const [sellType, setSellType] = useState('fiat');
		const [selling, setSelling] = useState(false);
	const apiURL = 'https://api.apexwallet.app/api/v1';


	//switch the way the user wants to buy coins, fiat or crypto
		const handleSellTypeChange = () => {
			if (sellType === 'fiat') {
				setSellType('crypto');
			} else if (sellType === 'crypto') {
				setSellType('fiat');
			}
		};

	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	const coinAmountToSellCrypto = (amountToSellCrypto) => {
		return parseFloat(amountToSellCrypto * coinInfo.market_data.current_price.usd).toFixed(2);
	};
	const coinAmountToSellFiat = (amountToSellFiat) => {
		return parseFloat(amountToSellFiat / coinInfo.market_data.current_price.usd).toFixed(5);
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
				let purchase = { coin: coinInfo.id, amount: convertedAmount };
				try {
					await axios
						.post(`${apiURL}/coin/sell`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								setModalUpSell(!modalUpSell);
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
				let purchase = { coin: coinInfo.id, amount: amountToSellCrypto};
				try {
					await axios
						.post(`${apiURL}/coin/sell`, purchase, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								setModalUpSell(!modalUpSell);
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

	const SellCoinsFunction = () => {
		if (coinInfo !== null && user !== null && wallet !== null) {
			return (
				<>
					<p className="header">
						Sell <span style={{ textTransform: 'capitalize' }}>{coinInfo.name ? coinInfo.name : coin}</span>
					</p>
					<div className="input">
						{sellType === 'fiat' ? (
							<>
								<span>$</span>
								<input
									value={amountToSellFiat}
									onChange={(e) => setAmountToSellFiat(e.target.value)}
									placeholder="1"
									type="number"
									step="any"
									pattern="[-+]?[0-9]*[.,]?[0-9]+"
									formNoValidate="formnovalidate"
								/>
							</>
						) : (
							<>
								<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
								<input
									value={amountToSellCrypto}
									onChange={(e) => setAmountToSellCrypto(e.target.value)}
									placeholder="0"
									type="number"
									step="any"
									pattern="[-+]?[0-9]*[.,]?[0-9]+"
									formNoValidate="formnovalidate"
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
								You pay {coinAmountToSellFiat(amountToSellFiat)} {coinInfo.symbol.toUpperCase()}{' '}
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
							{/* <MenuItem value={'decentraland'}>Decentraland</MenuItem> */}
						</Select>
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
										Sell <span style={{ textTransform: 'capitalize' }}>{coinInfo.name}</span>
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

	return (
		<>
			<div className={`sellCoins ${modalUpSell ? 'Show' : ''}`}>
				<div className="closeIcon" onClick={() => setModalUpSell(!modalUpSell)}>
					<IoClose />
				</div>

				<form onSubmit={handleSellCoin} className="sellCoinsForm">
					{SellCoinsFunction()}
				</form>
			</div>
		</>
	);
};

export default SellCoins;
