import { RotateSpinner } from 'react-spinners-kit';
import { RiNotification4Fill } from 'react-icons/ri';
import coinsSVG from '../../../../assets/logo/coinsSVG.svg';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Messages from '../Messages/Messages';

const CompleteDashboard = (user, wallet, watchList, news) => {
	const [hasNotifications, setHasNotifications] = useState(undefined);
	const [modalUpMessages, setModalUpMessages] = useState(false);
	const [messageModal, setMessageModal] = useState(false);

	useEffect(() => {
		const checkNotifications = () => {
			if (user !== null) {
				const hasMessagesCheck = user.messages.filter((message) => message.isRead === false);
				if (hasMessagesCheck.length > 0) {
					setHasNotifications(true);
				} else setHasNotifications(false);
			}
		};

		checkNotifications();
	}, [user]);

	const watchListFunction = () => {
		let length = watchList.length;
		if (length === 0) {
			return (
				<div className="noWatchList">
					<div>
						<img src={coinsSVG} alt="coins" />
						<p>Find an assortment of highlights and get a touch of each crypto to go for yourself.</p>
						<a href="/prices" className="allAssets">
							<p>See all assets </p>
						</a>
					</div>
				</div>
			);
		} else if (length > 0) {
			return (
				<div className="watchListContainer">
					{watchList.map((watchList, index) => (
						<Link to={`/prices/${watchList.id}`} className="watchListSubContainer" key={index}>
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
		let newsLength = 10;
		return news.slice(0, newsLength).map((news) => (
			<a className="newsDiv" key={news.id} target="_blank" rel="noopener noreferrer" href={news.url}>
				<div className="titleAndAuthor">
					<p>{news.title}</p>
					<p>
						<span>{news.source_info.name}</span> <span>&#8226;</span>{' '}
						<span>{moment.unix(news.published_on).startOf('hour').fromNow()}</span>
					</p>
				</div>
				<img src={news.imageurl} alt={news.source} />
			</a>
		));
	};

	if (news !== null && watchList !== null && user !== null && user.isActive === false) {
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

				<p className="watchListHeader">Watchlist</p>
				{watchListFunction()}
				<p className="newsHeader">News</p>
				{newsFunction()}
			</>
		);
	} else if (
    news !== null &&
    watchList !== null &&
    user !== null &&
    wallet !== null &&
    user.isActive === true
  ) {
    return (
      <>
        <div className="verifiedWithWallet">
          <div className="balanceDiv">
            <p className="balanceHeader">Available Balance</p>
            <p className="balanceUSD">
              ${parseFloat(wallet.balance).toFixed(2)}
            </p>
          </div>

          <div className="notificationIcon">
            {hasNotifications && <span className="activeNotification"></span>}
            <RiNotification4Fill onClick={() => setModalUpMessages(true)} />
            <Messages
              messageModal={messageModal}
              setMessageModal={setMessageModal}
              user={user}
              modalUpMessages={modalUpMessages}
              setModalUpMessages={setModalUpMessages}
            />
          </div>
          <div
            className={`Overlay ${modalUpMessages ? "Show" : ""}`}
            onClick={() => {
              setModalUpMessages(false);
              setMessageModal(false);
            }}
          />
        </div>

        <p className="watchListHeader">Watchlist</p>
        {watchListFunction()}
        <p className="newsHeader">News</p>
        {newsFunction()}
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
