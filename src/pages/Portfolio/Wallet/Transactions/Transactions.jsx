import { useState, useEffect, useRef, useContext } from 'react';
import { ImArrowDownLeft2, ImArrowUpRight2 } from 'react-icons/im';
import { RotateSpinner } from 'react-spinners-kit';
import AuthContext from '../../../../components/Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './Transactions.scss'

const Transactions = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null)
    let isRendered = useRef(false);
    //api endpoint:
    const apiURL = 'https://api.apexwallet.app/api/v1';


    useEffect(() => {
		isRendered.current = true;
		async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
				history.push('/login');
			} else if (loggedIn === true) {
				try {
					let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					if (isRendered.current === true) {
						setUser(user.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR: ' + error);
				}

				try {
					let wallet = await axios.get(`${apiURL}/wallet/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(err.response.data, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					if (isRendered.current === true) {
						setWallet(wallet.data);
					} else {
						return null;
					}
				} catch (error) {
					console.log('ERROR2: ', error);
				}
			}
		}
		load();

		return () => {
			isRendered.current = false;
		};
	}, [getLoggedIn, loggedIn, history]);




	//format the transaction date
	const formatDate = (dateStr) => {
		var date = new Date(dateStr);

		var monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		var d = date.getDate();
		var m = monthNames[date.getMonth()];
		var y = date.getFullYear();

		return `${d + ' ' + m + ' ' + y}`;
	};

	function getTransactions() {
        if (user !== null && user.isActive === true && user.wallet !== undefined && wallet !== null) {
			return (
				<>
					{wallet.transactions.map((transaction) => (
						<div className="walletTransaction" key={transaction._id}>
							<div
								style={{
									background:
										transaction.type === 'Free' ||
										transaction.type === 'Sold' ||
										transaction.type === 'Received'
											? '#C2FEDB'
											: '#FDC4CC',
									color:
										transaction.type === 'Free' ||
										transaction.type === 'Sold' ||
										transaction.type === 'Received'
											? '#12A550'
											: '#F71735',
								}}
								className="transactionIcon"
							>
								{transaction.type === 'Free' ||
								transaction.type === 'Sold' ||
								transaction.type === 'Received' ? (
									<ImArrowDownLeft2 />
								) : (
									<ImArrowUpRight2 />
								)}
							</div>
							<div className="memoAndDate">
								<p>
									{transaction.type} {transaction.coin}
								</p>
								<p>{formatDate(transaction.date)}</p>
							</div>
							<div className="value">
								<p>
									<span>
										{transaction.type === 'Free' ||
										transaction.type === 'Sold' ||
										transaction.type === 'Received'
											? ''
											: '-'}
									</span>
									${parseFloat(transaction.amount).toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</>
			);
		} else if (user !== null && user.wallet === undefined) {
            return <p className="noWalletTransaction">Once you create a wallet, your transactions will show up here</p>
        } else {
			return (
				<div className="loading">
					<RotateSpinner size={40} color="#080809" />
				</div>
			);
		}
    }

	return (
		<div className="transactionsComponent">
			<div className="container">
				<p className="header">All Transactions</p>
				<div className="transactionsContainer">
					{getTransactions()} <ToastContainer />
				</div>
			</div>
		</div>
	);
}

export default Transactions;