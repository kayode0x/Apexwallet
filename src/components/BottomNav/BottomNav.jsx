import './BottomNav.scss';
import { RiHome4Fill, RiHome4Line } from 'react-icons/ri';
import { IoWalletOutline, IoWallet, IoStatsChart } from 'react-icons/io5';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';
import { BsArrowUpDown } from 'react-icons/bs';
import { useLocation, Link } from 'react-router-dom';


const BottomNav = () => {
	const location = useLocation();

	const { pathname } = location;

	const splitLocation = pathname.split('/');

	return (
		<div className="navbar">
			<div className="navContainer">
				<Link to="/dashboard" className={splitLocation[1] === 'dashboard' ? 'active homeIcon' : 'homeIcon'}>
					{splitLocation[1] === 'dashboard' ? <RiHome4Fill /> : <RiHome4Line />}
				</Link>
				<Link to="/market" className={splitLocation[1] === 'market' ? 'active marketIcon' : 'marketIcon'}>
					<IoStatsChart />
				</Link>
				<Link to="#" className="tradeIcon">
					<BsArrowUpDown />
				</Link>
				<Link to="wallet" className={splitLocation[1] === 'wallet' ? 'active walletIcon' : 'walletIcon'}>
					{splitLocation[1] === 'wallet' ? <IoWallet /> : <IoWalletOutline />}
				</Link>
				<Link to="#" className="profileIcon">
					<RiUser3Line />
					{/* <RiUser3Fill /> */}
				</Link>
			</div>
		</div>
	);
};

export default BottomNav;
