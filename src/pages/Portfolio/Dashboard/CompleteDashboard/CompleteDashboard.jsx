import { RotateSpinner } from 'react-spinners-kit';
import { RiNotification4Line } from 'react-icons/ri';
import coinsSVG from '../../../../assets/logo/coinsSVG.svg';
import { Link } from 'react-router-dom';

const CompleteDashboard = (user, watchList) => {
	const watchListFunction = () => {
		let length = watchList.length;
		if (length === 0) {
			return (
				<div className="noWatchList">
					<div>
						<img src={coinsSVG} alt="coins" />
						<p>Find an assortment of highlights and get a touch of each crypto to go for yourself.</p>
						<Link to="/market" className="allAssets">
							<p>See all assets </p>
						</Link>
					</div>
				</div>
			);
		} else if (length > 0) {
			console.log(watchList);
			return (
				<div className="watchListContainer">
					{watchList.map((watchList, index) => (
						<Link to={`/market/${watchList.id}`} className="watchListSubContainer" key={index}>
							<img src={watchList.image} alt={watchList.name} />
							<div className="nameAndSymbol">
								<p>{watchList.name}</p>
								<p>{watchList.symbol.toUpperCase()}</p>
							</div>
							<div className="priceAndPercentage">
								<p>${watchList.price}</p>
								<p
									style={{
										color: watchList.percentChange < 0 ? '#FF1B1C' : '#68df44',
									}}
								>
									<span>{watchList.percentChange < 0 ? '' : '+'}</span>
									{Math.round((watchList.percentChange + Number.EPSILON) * 100) / 100}%
								</p>
							</div>
						</Link>
					))}
				</div>
			);
		}
	};


    const newsFunction = () => {
        
    }

	if (watchList !== null && user !== null && user.isActive === false && user.wallet === undefined) {
		return (
			<>
				<div className="welcomeContainer">
					<div className="leadWelcomeText">
						<p className="leadText">Welcome to Apex!</p>
						<p className="subText">
							Hey <span style={{ fontWeight: 'bold' }}>{user.name ? user.name : user.username}</span> 🙌 ,
							thanks for signing up! We're glad you made it here.
						</p>
					</div>

					<div className="getStarted">
						<p>Get started!</p>
						<p>
							Right now you can only check live prices and watch you favorite coins. To get full access,
							please verify your account with the email we sent you.
						</p>
					</div>
				</div>

				<p className="watchListHeader">Watch List</p>
				{watchListFunction()}
			</>
		);
	} else if (watchList !== null && user !== null && user.isActive === true && user.wallet === undefined) {
		return (
			<>
				<div className="verifiedNoWallet">
					<p className="leadText">Up next, open a wallet!</p>
					<p className="subText">
						Yay your account has been verified, go to the <a href="/wallet">wallets</a> tab to open a
						wallet.
					</p>
				</div>
				<p className="watchListHeader">Watch List</p>
				{watchListFunction()}
			</>
		);
	} else if (watchList !== null && user !== null && user.isActive === true && user.wallet !== undefined) {
		return (
			<>
				<div className="verifiedWithWallet">
					<div className="balanceDiv">
						<p className="balanceHeader">Available Balance</p>
						<p className="balanceUSD">${user.wallet.balance}</p>
					</div>

					<div className="notificationIcon">
						<span></span>
						<RiNotification4Line />
					</div>
				</div>
				<p className="watchListHeader">Watch List</p>
				{watchListFunction()}
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

export default CompleteDashboard;
