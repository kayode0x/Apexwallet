import { IoClose } from 'react-icons/io5';
import './Send.scss';
import { RotateSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { useState } from 'react';
import { BsArrowUpDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const SendCoins = ({ modalUpSend, setModalUpSend, coin, setCoin, coinInfo, user, wallet, balance }) => {
	const [amountToSend, setAmountToSend] = useState(1);
	const [sendType, setSendType] = useState('crypto');
	const [recipient, setRecipient] = useState('');
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const [sending, setSending] = useState(false);

	//switch the way the user wants to buy coins, fiat or crypto
	const handleBuyTypeChange = () => {
		if (sendType === 'fiat') {
			setSendType('crypto');
		} else if (sendType === 'crypto') {
			setSendType('fiat');
		}
	};

	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	//buy coin
	const handleSend = async (e) => {
		e.preventDefault();
		setSending(true);

		//for sending cash
		if (sendType === 'fiat') {
			if (amountToSend < 0) {
				toast.error("You can't send less than $0", {
					position: toast.POSITION.TOP_CENTER,
				});
				setSending(false);
			} else if (amountToSend > wallet.balance) {
				toast.error(
					`Your USD balance is $${parseFloat(wallet.balance).toFixed(2)}, you can't buy more than that`,
					{
						position: toast.POSITION.TOP_CENTER,
					}
				);
				setSending(false);
			} else {
				let body = { recipient: recipient, amount: amountToSend };
				try {
					await axios
						.post(`${apiURL}/wallet/send-cash`, body, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								setModalUpSend(!modalUpSend);
								toast.success(`Success 🚀`, {
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
							await toast.error(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setSending(false);
			}
		} //for sending crypto
		else if (sendType === 'crypto') {
			if (amountToSend < 0) {
				toast.error(`You can't send below 0 ${coinInfo.id}`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setSending(false);
			} else if (amountToSend > balance) {
				toast.error(`Your balance is $${parseFloat(balance).toFixed(5)}, you can't send more than that`, {
					position: toast.POSITION.TOP_CENTER,
				});
				setSending(false);
			} else {
				let body = { coin: coinInfo.id, amount: amountToSend, recipient: recipient };
				try {
					await axios
						.post(`${apiURL}/coin/send`, body, { withCredentials: true })
						.then((res) => {
							if (res.status === 200) {
								setModalUpSend(!modalUpSend);
								toast.success(`Success 🚀`, {
									position: toast.POSITION.TOP_CENTER,
								});
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}
						})
						.catch(async (err) => {
							//toastify ROCKS!!
							await toast.error(`${err.response.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
						});
				} catch (error) {
					console.log('Error: ', error);
				}
				setSending(false);
			}
		}
	};

	const sendFunction = () => {
		if (coinInfo !== null && user !== null && wallet !== null) {
			return (
				<>
					<p className="header">
						Send{' '}
						{sendType === 'fiat' ? (
							<span>Cash</span>
						) : (
							<span style={{ textTransform: 'capitalize' }}>{coinInfo.name ? coinInfo.name : coin}</span>
						)}
					</p>
					<div className="input">
						{sendType === 'fiat' ? (
							<span>USD</span>
						) : (
							<span style={{ textTransform: 'uppercase' }}>{coinInfo.symbol}</span>
						)}
						<input
							value={amountToSend}
							onChange={(e) => {
								setAmountToSend(e.target.value);
							}}
							type="number"
							pattern="[-+]?[0-9]*[.,]?[0-9]+"
							formNoValidate="formnovalidate"
							step="any"
							min="0"
							max="5000"
							placeholder="0"
							required={true}
						/>
						<div>
							<BsArrowUpDown onClick={handleBuyTypeChange} />
						</div>
					</div>
					<div className="selectBalanceAndBTN">
						<div className="input2">
							<input
								value={recipient}
								onChange={(e) => {
									setRecipient(e.target.value);
								}}
								type="text"
								required={true}
								placeholder="Username"
							/>
						</div>
						{sendType === 'crypto' ? (
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
							</Select>
						) : null}
						<div className="coinAndWalletTab">
							{sendType === 'fiat' ? (
								<div>
									<p>USD balance</p> <span>${parseFloat(wallet.balance).toFixed(2)}</span>
								</div>
							) : (
								<>
									<div>
										<p>{coinInfo.symbol.toUpperCase()} balance</p>{' '}
										<span>{parseFloat(balance).toFixed(5)}</span>
									</div>
								</>
							)}
							<button
								//disable the "Send Button" if the requirements are not met.
								disabled={
									sending || recipient === '' || amountToSend <= 0 || sendType === 'fiat'
										? amountToSend > wallet.balance || amountToSend < 2
										: amountToSend > balance
										? true
										: false
								}
								type="submit"
							>
								{sending ? (
									<p>Sending...</p>
								) : (
									<p>
										Send{' '}
										{sendType === 'fiat' ? (
											<span> Cash </span>
										) : (
											<span style={{ textTransform: 'capitalize' }}>{coinInfo.name}</span>
										)}
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
		<div className={`send ${modalUpSend ? 'Show' : ''}`}>
			<div className="closeIcon" onClick={() => setModalUpSend(!modalUpSend)}>
				<IoClose />
			</div>

			<form onSubmit={handleSend} className="sendForm">
				{sendFunction()}
			</form>
		</div>
	);
};

export default SendCoins;
