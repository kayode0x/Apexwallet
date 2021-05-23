import { useState, useEffect, useRef, useContext } from 'react';
import { ImArrowDownLeft2, ImArrowUpRight2 } from 'react-icons/im';
import { RotateSpinner } from 'react-spinners-kit';
import AuthContext from '../../../../components/Auth/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './Transactions.scss';
import moment from 'moment';
import { IoChevronBack } from 'react-icons/io5';

const Transactions = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const [wallet, setWallet] = useState(null);
	const [sorted, setSorted] = useState(null);
	const [ctrlSorted, setCtrlSorted] = useState('all');
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
						setSorted(wallet.data.transactions);
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


	// sort the wallet transactions by type
	const sortFunction = (format) => {
		if (wallet !== null && sorted !== null) {
			if (format === 'all') {
				setCtrlSorted('all')

				function compare(a, b) {
					if (a.date < b.date) {
						return 1;
					}
					if (a.date > b.date) {
						return -1;
					}
					return 0;
				}

				let newTransactions = wallet.transactions.sort(compare); //sort all transactions by 'date'
				setSorted(newTransactions);

			} else if (format === 'income') {
				let incomeSort = wallet.transactions.filter((transaction) => transaction.type === 'Sold' || transaction.type === 'Free');
				setSorted(incomeSort);
				setCtrlSorted('income'); //sort all transactions by type 'income'
			} else if (format === 'expense') {
				let expenseSort = wallet.transactions.filter((transaction) => transaction.type === 'Bought');
				setSorted(expenseSort);
				setCtrlSorted('expense'); //sort all transactions by type 'expense'
			} else if (format === 'amount'){
				setCtrlSorted('amount');

				function compare(a, b) {
					if (a.amount < b.amount) {
						return 1;
					}
					if (a.amount > b.amount) {
						return -1;
					}
					return 0;
				}

				let amountSort = wallet.transactions.sort(compare);
				setSorted(amountSort); //sort all transactions by type 'amount descending'
			}
		}
	};

	function getTransactions() {
		if (
			user !== null &&
			user.isActive === true &&
			user.wallet !== undefined &&
			wallet !== null && 
			sorted !== null
		) {
			return (
				<>
					<div className="sortTransactions">
						<div
							onClick={() => sortFunction('all')}
							className={ctrlSorted === 'all' ? 'active allTransactions' : 'allTransactions'}
						>
							All
						</div>
						<div
							onClick={() => sortFunction('amount')}
							className={ctrlSorted === 'amount' ? 'active allTransactionsAmount' : 'allTransactionsAmount'}
						>
							Amount
						</div>
						<div
							onClick={() => sortFunction('income')}
							className={ctrlSorted === 'income' ? 'active incomeTransactions' : 'incomeTransactions'}
						>
							Income
						</div>
						<div
							onClick={() => sortFunction('expense')}
							className={ctrlSorted === 'expense' ? 'active expenseTransactions' : 'expenseTransactions'}
						>
							Expense
						</div>
					</div>
					{sorted.map((transaction) => (
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
								<p>{moment(transaction.date).format('dddd, MMMM Do')}</p>
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
			return <p className="noWalletTransaction">Once you create a wallet, your transactions will show up here</p>;
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
				<div className="header">
					<div className="backEmoji" onClick={history.goBack}>
						<IoChevronBack />
					</div>
					<p>All Transactions</p>
				</div>
				<div className="transactionsContainer">
					{getTransactions()} <ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default Transactions;
