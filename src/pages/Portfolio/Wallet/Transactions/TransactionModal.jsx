import './TransactionModal.scss';
import moment from 'moment';
import { IoIosCheckmark } from 'react-icons/io';

const TransactionModal = ({ singleTransaction, transactionModal }) => {
	const transactionsFunc = (coin, type, amount, symbol) => {
		if (singleTransaction !== null) {
			if (coin !== 'Dollars' && coin !== 'USD' && type === 'Sent') {
				return (
					<span style={{ textTransform: 'uppercase' }}>
						-{amount} {symbol ? symbol : ''}
					</span>
				);
			} else if (coin !== 'Dollars' && coin !== 'USD' && type === 'Received') {
				return (
					<span style={{ textTransform: 'uppercase' }}>
						{amount} {symbol ? symbol : ''}
					</span>
				);
			} else {
				return (
					<span>
						<span>{type === 'Free' || type === 'Sold' || type === 'Received' ? '' : '-'}</span>$
						{parseFloat(amount).toFixed(2)}
					</span>
				);
			}
		}
	};
	const singleTransactionFunc = () => {
		if (singleTransaction !== null) {
			return (
				<>
					<div className="amountAndDate">
						<p className="amount">
							{transactionsFunc(
								singleTransaction.coin,
								singleTransaction.type,
								singleTransaction.amount,
								singleTransaction.symbol
							)}
						</p>
						<p className="memo">{singleTransaction.memo ? singleTransaction.memo : singleTransaction.name}</p>
					</div>

					<hr />

					<div className="date">
						<p>Date</p>
						<p> {moment(singleTransaction.date).format('LLL')}</p>
					</div>

					<div className="status">
						<p>Status</p>
						<div className="completeCheck">
							<div className="icon">
								<IoIosCheckmark />
							</div>
							<p>Completed</p>
						</div>
					</div>
				</>
			);
		}
	};
	return <div className={`transactionModal ${transactionModal ? 'Show' : ''}`}>{singleTransactionFunc()}</div>;
};

export default TransactionModal;
