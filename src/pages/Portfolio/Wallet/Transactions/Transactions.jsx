import { useState, useEffect } from 'react';
import { ImArrowDownLeft2, ImArrowUpRight2, ImLoop2 } from 'react-icons/im';
import { RotateSpinner } from 'react-spinners-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './Transactions.scss';
import { IoChevronBack } from 'react-icons/io5';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import BottomNav from '../../../../components/BottomNav/BottomNav';
import TransactionModal from './TransactionModal';

const Transactions = ({ user, wallet, loggedIn, sorted, setSorted }) => {
	const history = useHistory();
	const [ctrlSorted, setCtrlSorted] = useState('all');
	//receipt modal.
	const [transactionModal, setTransactionModal] = useState(false);
	const [singleTransaction, setSingleTransaction] = useState(null);

	useEffect(() => {
		if (loggedIn === false) {
			history.push('/login');
		}
	}, [loggedIn, history]);

	// sort the wallet transactions by type
	const sortFunction = (format) => {
		if (wallet !== null && sorted !== null) {
			if (format === 'all') {
				setCtrlSorted('all');

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
				let incomeSort = wallet.transactions.filter(
					(transaction) =>
						transaction.type === 'Sold' || transaction.type === 'Free' || transaction.type === 'Received'
				);
				setSorted(incomeSort);
				setCtrlSorted('income'); //sort all transactions by type 'income'
			} else if (format === 'expense') {
				let expenseSort = wallet.transactions.filter(
					(transaction) => transaction.type === 'Bought' || transaction.type === 'Sent'
				);
				setSorted(expenseSort);
				setCtrlSorted('expense'); //sort all transactions by type 'expense'
			} else if (format === 'amount') {
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

	const transactionsFunc = (coin, type, amount, symbol) => {
		if (wallet !== null) {
			if (coin !== 'Dollars' && coin !== 'USD' && type === 'Sent') {
				return (
					<p style={{ textTransform: 'uppercase' }}>
						-{amount} {symbol ? symbol : ''}
					</p>
				);
			} else if (coin !== 'Dollars' && coin !== 'USD' && type === 'Received') {
				return (
					<p style={{ textTransform: 'uppercase' }}>
						{amount} {symbol ? symbol : ''}
					</p>
				);
			} else if (coin !== 'Dollars' && coin !== 'USD' && type === 'Converted') {
				return (
					<p style={{ textTransform: 'uppercase' }}>
						-{amount} {symbol ? symbol : ''}
					</p>
				);
			} else {
				return (
					<p>
						<span>{type === 'Free' || type === 'Sold' || type === 'Received' ? '' : '-'}</span>$
						{parseFloat(amount).toFixed(2)}
					</p>
				);
			}
		}
	};

	//get the icon background based on the transaction type
	const getIconBg = (type) => {
		let color;
		if (type === 'Received' || type === 'Free' || type === 'Sold') {
			color = '#C2FEDB';
			return color;
		} else if (type === 'Bought' || type === 'Sent') {
			color = '#FDC4CC';
			return color;
		} else if (type === 'Converted') {
			color = '#bbdefb';
			return color;
		}
	};

	//get the icon color based on the transaction type
	const getIconColor = (type) => {
		let color;
		if (type === 'Received' || type === 'Free' || type === 'Sold') {
			color = '#12A550';
			return color;
		} else if (type === 'Bought' || type === 'Sent') {
			color = '#F71735';
			return color;
		} else if (type === 'Converted') {
			color = '#1565c0';
			return color;
		}
	};

	//get the icon based on the transaction type
	const getIcon = (type) => {
		let icon;
		if (type === 'Received' || type === 'Free' || type === 'Sold') {
			icon = <ImArrowDownLeft2 />;
			return icon;
		} else if (type === 'Bought' || type === 'Sent') {
			icon = <ImArrowUpRight2 />;
			return icon;
		} else if (type === 'Converted') {
			icon = <ImLoop2 />;
			return icon;
		}
	};

	function getTransactions() {
		if (
			user !== null &&
			user.isActive === true &&
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
							className={
								ctrlSorted === 'amount' ? 'active allTransactionsAmount' : 'allTransactionsAmount'
							}
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
						<div
							onClick={() => {
								setTransactionModal(!transactionModal);
								setSingleTransaction(transaction);
							}}
							className="walletTransaction"
							key={transaction._id}
						>
							<div
								style={{
									background: getIconBg(transaction.type),
									color: getIconColor(transaction.type),
								}}
								className="transactionIcon"
							>
								{getIcon(transaction.type)}
							</div>
							<div className="memoAndDate">
								<p>{transaction.coin}</p>
								<p>{transaction.name}</p>
							</div>
							<div className="value">
								{transactionsFunc(
									transaction.coin,
									transaction.type,
									transaction.amount,
									transaction.symbol
								)}
							</div>
						</div>
					))}
				</>
			);
		} else if (user.isActive === false) {
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
		<HelmetProvider>
			<div className="transactionsComponent">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Transactions - Apex</title>
				</Helmet>
				<BottomNav />
				<div className="container">
					<div className="header">
						<div className="backEmoji" onClick={() => history.push('/wallet')}>
							<IoChevronBack />
						</div>
						<p>All Transactions</p>
					</div>
					<div className="transactionsContainer">
						{getTransactions()}
						<TransactionModal
							setTransactionModal={setTransactionModal}
							singleTransaction={singleTransaction}
							transactionModal={transactionModal}
						/>
						<div
							className={`Overlay ${transactionModal ? 'Show' : ''}`}
							onClick={() => setTransactionModal(!transactionModal)}
						/>
						<ToastContainer hideProgressBar autoClose={3000} />
					</div>
				</div>
			</div>
		</HelmetProvider>
	);
};

export default Transactions;
