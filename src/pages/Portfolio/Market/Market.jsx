import './Market.scss';
import AuthContext from '../../../components/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';

const Market = () => {
	const history = useHistory();
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const [wallet, setWallet] = useState(null);
	const [user, setUser] = useState(null);
	const [market, setMarket] = useState(null);
	const apiURL = 'https://api.apexwallet.app/api/v1';
	const coingeckoApi =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin%2C%20ethereum-classic%2C%20litecoin%2C%20tether%2C%20%20ripple%2C%20binancecoin%2C%20tether&order=market_cap_desc&per_page=100&page=1&sparkline=false';

	useEffect(() => {
		async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
				// history.push('/login');
			} else if (loggedIn === true) {
				try {
					let user = await axios.get(`${apiURL}/user/`, { withCredentials: true }).catch(async (err) => {
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					setUser(user.data);
					console.log(user.data);
				} catch (error) {
					console.log('ERROR' + error.response);
				}

                try {
                    let market = await axios.get(coingeckoApi).catch(async (err) => {
						await toast.dark(err, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
                    console.log("MARKET: ", market)
                } catch (error) {
                    console.log('ERROR' + error.response);
                }
			}
		}

        load();
	}, [getLoggedIn, loggedIn, history]);

	return (
		<div className="market">
			<div className="container">
				<p className="header">Market</p>
			</div>

			<BottomNav />
			<ToastContainer />
		</div>
	);
};

export default Market;
