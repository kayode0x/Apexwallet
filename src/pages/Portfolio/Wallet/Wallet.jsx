import './Wallet.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BottomNav from '../../../components/BottomNav/BottomNav';
import CompleteWallet from './CompleteWallet/CompleteWallet';
import useTitle from '../../../utils/useTitle';

const Wallet = ({ user, wallet, prices, loggedIn }) => {
	const history = useHistory();
	const [asset, setAsset] = useState(null);
	const [creatingWallet, setCreatingWallet] = useState(false);
	//breakpoint set at mobile only
	const matches = useMediaQuery('(max-width:767px)');
	useTitle('Wallet | Apexwallet');

	//api endpoint.
	const apiURL = 'https://api.apexwallet.app/api/v1';

	useEffect(() => {
		if (loggedIn === false) {
			history.push('/login');
		}
	}, [loggedIn, history]);

	useEffect(() => {
		if (prices !== null && wallet !== null && user !== null) {
			let arr = [];

			if (wallet.coins !== undefined) {
				wallet.coins.forEach((coin) => {
					const newCoin = coin;
					//produce external data for the user's assets
					prices.forEach((price) => {
						if (price.id === newCoin.coin) {
							let newCoinData = {
								name: price.name,
								symbol: price.symbol,
								id: price.id,
								usdValue: price.current_price * newCoin.balance,
								price: price.current_price,
								image: price.image,
								balance: newCoin.balance,
							};
							arr.push(newCoinData);
						}
					});
				});
			}

			function compare(a, b) {
				if (a.usdValue < b.usdValue) {
					return 1;
				}
				if (a.usdValue > b.usdValue) {
					return -1;
				}
				return 0;
			}

			arr.sort(compare);
			setAsset(arr);
		}
	}, [prices, wallet, user]);

	//create a wallet
	const handleCreateWallet = async (e) => {
		e.preventDefault();

		setCreatingWallet(true);
		try {
			await axios
				.post(`${apiURL}/wallet/`, { withCredentials: true })
				.then(async (res) => {
					if (res.status === 201) {
						await toast.success(res.data, {});
					}
				})
				.catch(async (err) => {
					await toast.error(err.response.data, {});
					setCreatingWallet(false);
				});
		} catch (error) {
			console.log('Error: ', error);
			setCreatingWallet(false);
		}
	};

	return (
		<>
			<div className="wallet">
				<BottomNav prices={prices} />
				<div className="container">
					<p className="header">Wallet</p>

					{/* Moved the complete user to a separate function */}
					<CompleteWallet
						user={user}
						asset={asset}
						wallet={wallet}
						handleCreateWallet={handleCreateWallet}
						creatingWallet={creatingWallet}
						matches={matches}
					/>
				</div>
				<ToastContainer hideProgressBar autoClose={3000} />
			</div>
		</>
	);
};

export default Wallet;
