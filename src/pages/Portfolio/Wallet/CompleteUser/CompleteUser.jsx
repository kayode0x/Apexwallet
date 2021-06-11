import { Link } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';
import saturnSVG from '../../../../assets/logo/saturnSVG.svg';
import alienSVG from '../../../../assets/logo/alienSVG.svg';
import astronautSVG from '../../../../assets/logo/astronautSVG.svg';
import sunSVG from '../../../../assets/logo/sunSVG.svg';
import { ImArrowDownLeft2, ImArrowUpRight2 } from 'react-icons/im';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CardDesign from './CardDesign';
import { useState } from 'react';
import TransactionModal from '../Transactions/TransactionModal';

const CompleteUser = ({ user, asset, wallet, handleCreateWallet, creatingWallet }) => {
	//receipt modal.
	const [transactionModal, setTransactionModal] = useState(false);
	const [singleTransaction, setSingleTransaction] = useState(null);

	let cardImage;

	if ((user !== null && user.cardDesign) === 'saturnSVG') {
		cardImage = saturnSVG;
	} else if ((user !== null && user.cardDesign) === 'alienSVG') {
		cardImage = alienSVG;
	} else if ((user !== null && user.cardDesign) === 'astronautSVG') {
		cardImage = astronautSVG;
	} else if ((user !== null && user.cardDesign) === 'sunSVG') {
		cardImage = sunSVG;
	} else {
		cardImage = saturnSVG;
	}

	const cardDesignFunction = () => {
		return (
			<div className={user.cardDesign ? user.cardDesign : 'saturnSVG'}>
				<CardDesign BsThreeDotsVertical={BsThreeDotsVertical} />
				<div className="apexWallet">Apex Card</div>
				<div className="cardBalance">
					<p>
						<span>$</span>
						{parseFloat(wallet.balance).toFixed(2)}
					</p>
				</div>
				<p className="cardNumber">
					<span>6732</span> <span>9239</span> <span>4344</span> <span>2230</span>
				</p>
				<img className="cardSVG" src={cardImage} alt="Card Design" />
			</div>
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

	const transactionsFunction = () => {
		return (
			<div className="transactionsContainer">
				{/* Transactions Container */}
				<div className="transactionsHeader">
					<p>Transactions</p>
					<a href="/wallet/transactions">See All</a>
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

	if (user !== null && user.isActive === true && user.wallet !== undefined && asset !== null && wallet !== null) {
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
	} else if (user !== null && user.isActive === true && user.wallet === undefined) {
		return (
			<>
				<div className="createWallet">
					<p>Account Verified!</p>
					<p>Click the button below to create a wallet and get started 🚀</p>

					<button onClick={handleCreateWallet} disabled={creatingWallet ? true : false}>
						{creatingWallet ? <RotateSpinner size={30} color="#fff" /> : 'Create Wallet'}
					</button>
				</div>
				<div className="notActive2">
					<p>Once you create a wallet, your assets will show up here.</p>
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
