import './BottomNav.scss';
import { HiOutlineHome } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';
import { RiUser3Line, RiBarChartLine } from 'react-icons/ri';
import { BsArrowUpDown } from 'react-icons/bs';
import { useLocation, Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useState } from 'react';
import TradeModal from '../TradeModal/TradeModal';
import icon from "../../assets/logo/icon-tx.svg";

const BottomNav = () => {
	const matches = useMediaQuery('(max-width:767px)');

	const location = useLocation();

	const { pathname } = location;

	const splitLocation = pathname.split('/');

	const [tradeModal, setTradeModal] = useState(false);

	return (
    <div className="navbar">
      {matches ? null : (
        <Link className="logoApex" to="/dashboard">
          <img src={icon} alt="Apexwallet-logo" />
        </Link>
      )}
      <Link
        to="/dashboard"
        style={{
          animation: splitLocation[1] === "dashboard" ? "navIconAnim .3s" : "",
        }}
        className={
          splitLocation[1] === "dashboard" ? "active homeIcon" : "homeIcon"
        }
      >
        {matches ? <HiOutlineHome /> : <p>Home</p>}
      </Link>
      <Link
        to="/prices"
        style={{
          animation: splitLocation[1] === "prices" ? "navIconAnim .3s" : "",
        }}
        className={
          splitLocation[1] === "prices" ? "active pricesIcon" : "pricesIcon"
        }
      >
        {matches ? <RiBarChartLine /> : <p>Prices</p>}
      </Link>
      <Link
        to="#"
        onClick={() => {
          setTradeModal(!tradeModal);
        }}
        className="tradeIcon"
      >
        {matches ? null : <p>Trade</p>}
        {matches && <BsArrowUpDown />}
      </Link>
      <Link
        to="/wallet"
        style={{
          animation: splitLocation[1] === "wallet" ? "navIconAnim .3s" : "",
        }}
        className={
          splitLocation[1] === "wallet" ? "active walletIcon" : "walletIcon"
        }
      >
        {matches ? <IoWalletOutline /> : <p>Wallet</p>}
      </Link>
      <Link
        to="/account"
        style={{
          animation: splitLocation[1] === "account" ? "navIconAnim .3s" : "",
        }}
        className={
          splitLocation[1] === "account" ? "active accountIcon" : "accountIcon"
        }
      >
        {matches ? <RiUser3Line /> : <p>Account</p>}
      </Link>

      <TradeModal setTradeModal={setTradeModal} tradeModal={tradeModal} />
      <div
        className={`Overlay ${tradeModal ? "Show" : ""}`}
        onClick={() => setTradeModal(!tradeModal)}
      />
    </div>
  );
};

export default BottomNav;
