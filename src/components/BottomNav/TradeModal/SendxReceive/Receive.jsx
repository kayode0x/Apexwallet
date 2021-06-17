import { IoClose } from 'react-icons/io5';
import './Receive.scss';
import { RotateSpinner } from 'react-spinners-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { MdContentCopy } from 'react-icons/md';
import QRCode from 'qrcode.react';

const ReceiveCoins = ({ modalUpReceive, setModalUpReceive, coin, setCoin, coinInfo, user, wallet, address }) => {
	const handleChange = (event) => {
		setCoin(event.target.value);
	};

	const receiveFunction = () => {
		if (coinInfo !== null && user !== null && wallet !== null && address !== null) {
			return (
				<>
					<p className="header">
						Receive{' '}
						<span style={{ textTransform: 'capitalize' }}>{coinInfo.name ? coinInfo.name : coin}</span>
					</p>
					<div className="selectBalanceAndBTN">
						<div className="usernameAndAddress">
							<div className="containerx">
								<QRCode
									level={'L'}
									includeMargin={false}
									renderAs={'svg'}
									imageSettings={{
										src: 'https://appzonk.com/apex/',
										x: null,
										y: null,
										height: 40,
										width: 40,
										excavate: true,
									}}
									className="qrCode"
									size={220}
									value={address}
								/>
								{/* <p>Username</p>
								<div className="iconAndName">
									<span>{user.username}</span>
									<div
										onClick={() => {
											navigator.clipboard.writeText(user.username);
											toast.success(`Copied Username`, {
												hideProgressBar: true,
											});
										}}
										className="icon"
									>
										<MdContentCopy />
									</div>
								</div> */}
								<p>{coinInfo.symbol.toUpperCase()} Address</p>
								<div className="iconAndName">
									<span>{address}</span>
									<div
										onClick={() => {
											navigator.clipboard.writeText(address);
											toast.success(`Copied ${coinInfo.symbol.toUpperCase()} Address`, {
												hideProgressBar: true,
											});
										}}
										className="icon"
									>
										<MdContentCopy />
									</div>
								</div>
							</div>
						</div>
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
						<button
							onClick={() => {
								if (navigator.share) {
									navigator
										.share({
											title: `Share ${coinInfo.name} address`,
											url: coinInfo.address,
										})
										.then(() => {
											console.log('Thanks for sharing!');
										})
										.catch(console.error);
								} else {
									navigator.clipboard.writeText(address);
									toast.success(`Copied ${coinInfo.symbol.toUpperCase()} Address`, {
										hideProgressBar: true,
									});
								}
							}}
						>
							Share Address
						</button>
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
		<div className={`receive ${modalUpReceive ? 'Show' : ''}`}>
			<div className="closeIcon" onClick={() => setModalUpReceive(!modalUpReceive)}>
				<IoClose />
			</div>

			{/* Receive Functions */}
			<div className="receiveDiv">{receiveFunction()}</div>
		</div>
	);
};

export default ReceiveCoins;
