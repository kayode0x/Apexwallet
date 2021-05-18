import './BottomNav.scss';
import { RiHome4Fill, RiHome4Line } from 'react-icons/ri';
import { IoWalletOutline, IoWallet, IoStatsChart } from 'react-icons/io5';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';
import { BsArrowUpDown } from 'react-icons/bs';
import { useLocation, Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BottomNav = () => {
	const matches = useMediaQuery('(max-width:767px)');

	const location = useLocation();

	const { pathname } = location;

	const splitLocation = pathname.split('/');

	return (
		<div className="navbar">
			{matches ? null : <p className="logoApex">Apex</p>}
			<Link
				to="/dashboard"
				style={{ animation: splitLocation[1] === 'dashboard' ? 'navIconAnim .3s' : '' }}
				className={splitLocation[1] === 'dashboard' ? 'active homeIcon' : 'homeIcon'}
			>
				{matches ? splitLocation[1] === 'dashboard' ? <RiHome4Fill /> : <RiHome4Line /> : <p>Home</p>}
			</Link>
			<Link
				to="/market"
				style={{ animation: splitLocation[1] === 'market' ? 'navIconAnim .3s' : '' }}
				className={splitLocation[1] === 'market' ? 'active marketIcon' : 'marketIcon'}
			>
				{matches ? <IoStatsChart /> : <p>Market</p>}
			</Link>
			<Link to="#" className="tradeIcon">
				{matches ? <BsArrowUpDown /> : 'Trade'}
			</Link>
			<Link
				to="/wallet"
				style={{ animation: splitLocation[1] === 'wallet' ? 'navIconAnim .3s' : '' }}
				className={splitLocation[1] === 'wallet' ? 'active walletIcon' : 'walletIcon'}
			>
				{matches ? splitLocation[1] === 'wallet' ? <IoWallet /> : <IoWalletOutline /> : <p>Wallet</p>}
			</Link>
			<Link
				to="/account"
				style={{ animation: splitLocation[1] === 'account' ? 'navIconAnim .3s' : '' }}
				className={splitLocation[1] === 'account' ? 'active accountIcon' : 'accountIcon'}
			>
				{matches ? splitLocation[1] === 'account' ? <RiUser3Fill /> : <RiUser3Line /> : <p>Account</p>}
			</Link>
		</div>
	);
};

export default BottomNav;
