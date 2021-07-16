import './Dashboard.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomNav from '../../../components/BottomNav/BottomNav';
import useTitle from '../../../utils/useTitle'
import CompleteDashboard from './CompleteDashboard/CompleteDashboard';

const Dashboard = ({user, wallet, prices, news, loggedIn}) => {
	const history = useHistory();
	const [watchList, setWatchList] = useState(null);
	useTitle('Home | Apexwallet');

	useEffect(() => {
		if (loggedIn === false) {
			history.push('/login');
		}
	}, [loggedIn, history]);

	//min the user's watch list with the coingecko API
	useEffect(() => {
		if (user !== null && prices !== null) {
			let arr = [];

			if (user.watchList !== undefined) {
				user.watchList.forEach((watchedCoin) => {
					const oldList = watchedCoin;
					prices.forEach((price) => {
						if (price.id === oldList.coinId) {
							let newCoinData = {
								name: price.name,
								symbol: price.symbol,
								id: price.id,
								price: price.current_price,
								percentChange: price.price_change_percentage_24h,
								image: price.image,
							};
							arr.push(newCoinData);
						}
					});
				});
			}

			setWatchList(arr);
		}
	}, [prices, user]);

	return (
		<>
			<div className="dashboard">
				<BottomNav />
				<div className="container">
					<p className="header">Home</p>
					{CompleteDashboard(user, wallet, watchList, news)}
				</div>
				<ToastContainer hideProgressBar autoClose={3000} />
			</div>
		</>
	);
};

export default Dashboard;
