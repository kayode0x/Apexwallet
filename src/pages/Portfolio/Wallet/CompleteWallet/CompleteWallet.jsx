import { Link } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';
import { ImArrowDownLeft2, ImArrowUpRight2, ImLoop2 } from 'react-icons/im';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CardDesign from './CardDesign';
import { useState } from 'react';
import TransactionModal from '../Transactions/TransactionModal';
import type1 from '../../../../assets/debit-cards/complete-card.svg';
import type2 from '../../../../assets/debit-cards/complete-card2.svg';
import type3 from '../../../../assets/debit-cards/complete-card3.svg';
import type4 from '../../../../assets/debit-cards/complete-card4.svg';

const CompleteUser = ({ user, asset, wallet }) => {
	//receipt modal.
	const [transactionModal, setTransactionModal] = useState(false);
	const [singleTransaction, setSingleTransaction] = useState(null);

	//switch between the card designs
	const pickCard = () => {
		switch (user.cardDesign) {
			case 'type-1':
				return type1;
			case 'type-2':
				return type2;
			case 'type-3':
				return type3;
			case 'type-4':
				return type4;
			default:
				return type1;
		}
	};

	const cardDesignFunction = () => {
		return (
			<>
				<div className="cardDesign">
					<CardDesign BsThreeDotsVertical={BsThreeDotsVertical} />
					<img className="newCard" src={pickCard()} alt="" />
					<div className="cardName">
						<p>{user.name ? user.name : user.username}</p>
					</div>
					<div className="cardBalance">
						<p>
							<span>$</span>
							{parseFloat(wallet.balance).toFixed(2)}
						</p>
					</div>
				</div>
			</>
		);
	};
	const assetsFunction = () => {
		return (
			<div className="assetsContainer">
				{/* Assets container */}
				<p className="assetsHeader">Assets</p>
				{asset.map((asset, index) => (
					<Link to={`/prices/${asset.id}`} className="asset" key={index}>
						<div className="imageAndName">
							<img src={asset.image} alt={asset.name} />
							<div className="nameAndSymbol">
								<p>{asset.name}</p>
							</div>
						</div>
						<div className="priceAndBalance">
							<p>${parseFloat(asset.usdValue).toFixed(2)}</p>
							<p>
								{parseFloat(asset.balance).toFixed(5)}{' '}
								<span style={{ textTransform: 'uppercase' }}>{asset.symbol}</span>
							</p>
						</div>
					</Link>
				))}
			</div>
		);
	};
	const transactionsFunc = (coin, type, amount, symbol) => {
		if (asset !== null && wallet !== null) {
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

	const transactionsFunction = () => {
		return (
			<div className="transactionsContainer">
				{/* Transactions Container */}
				<div className="transactionsHeader">
					<p>Transactions</p>
					<Link to="/wallet/transactions">See All</Link>
				</div>
				{wallet.transactions.slice(0, 5).map((transaction) => (
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
			</div>
		);
	};

	if (user !== null && user.isActive === true && asset !== null) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }} className="cardAssetsAndTransactions">
				{cardDesignFunction()}
				<div className="coinsAndTransactions">
					{assetsFunction()}
					{transactionsFunction()}
				</div>
				<TransactionModal
					setTransactionModal={setTransactionModal}
					singleTransaction={singleTransaction}
					transactionModal={transactionModal}
				/>
				<div
					className={`Overlay ${transactionModal ? 'Show' : ''}`}
					onClick={() => setTransactionModal(!transactionModal)}
				/>
			</div>
		);
	} else if (user !== null && user.isActive === false) {
		return (
			<>
				<div className="notActive">
					<p className="leadText">Verify your account</p>
					<p className="subText">You can not open a wallet until you have verified your account.</p>
					<p className="thirdText">We sent you an email 😉</p>
				</div>
				<div className="notActive2">
					<p>Once verified, your assets will show up here.</p>
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

export default CompleteUser;
