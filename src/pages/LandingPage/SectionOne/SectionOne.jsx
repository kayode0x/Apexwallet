import './SectionOne.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PricesIMG from '../../../assets/mockups/IMG_5420.PNG';
import bitcoin from '../../../assets/landingLogos/bitcoin.png';
import ethereum from '../../../assets/landingLogos/ethereum.png';
import tether from '../../../assets/landingLogos/tether.png';
import dogecoin from '../../../assets/landingLogos/dogecoin.png';
import binanceCoin from '../../../assets/landingLogos/binance-coin.png';
import cardano from '../../../assets/landingLogos/cardano.png';
import usdCoin from '../../../assets/landingLogos/usd-coin.png';
import uniswap from '../../../assets/landingLogos/uniswap.png';
import bitcoinCash from '../../../assets/landingLogos/bitcoin-cash.png';
import xrp from '../../../assets/landingLogos/xrp.png';
import tron from '../../../assets/landingLogos/tron.png';
import ethereumClassic from '../../../assets/landingLogos/ethereum-classic.png';
import litecoin from '../../../assets/landingLogos/litecoin.png';
import dash from '../../../assets/landingLogos/dash.png';
import polkadot from '../../../assets/landingLogos/polkadot-new.png';
import { Cross as Hamburger } from 'hamburger-react';

const SectionOne = () => {
	const [navOpen, setNavOpen] = useState(false);
	//prevent scrolling when the navbar is open
	if (navOpen === true) {
		var bodyOpen = document.getElementsByTagName('BODY')[0];
		bodyOpen.style.overflow = 'hidden';
	} else {
		var bodyClose = document.getElementsByTagName('BODY')[0];
		bodyClose.style.overflow = 'auto';
	}

	return (
		<div className="sectionOne">
			<nav>
				<Link to="/" className="logo">
					Apexwallet
				</Link>
				<div className="desktop">
					<Link to="/learn">Learn</Link>
					<Link to="/about">About Us</Link>
					<Link to="/login">Sign In</Link>
					<Link className="signupBtn" to="/signup">
						Get Started
					</Link>
				</div>
				<div className="mobile">
					<Hamburger size={25} toggled={navOpen} toggle={setNavOpen} />
				</div>
			</nav>
			{navOpen && (
				<div className="mobileNav">
					<Link to="/learn">Learn</Link>
					<Link to="/about">About Us</Link>
					<Link to="/login">Sign In</Link>
					<Link className="signupBtn" to="/signup">
						Get Started
					</Link>
				</div>
			)}
			<div className="container">
				<div className="coinLogo bitcoin">
					<img src={bitcoin} alt="bitcoin" />
				</div>
				<div className="coinLogo ethereum">
					<img src={ethereum} alt="ethereum" />
				</div>
				<div className="coinLogo tether">
					<img src={tether} alt="tether" />
				</div>
				<div className="coinLogo dogecoin">
					<img src={dogecoin} alt="dogecoin" />
				</div>
				<div className="coinLogo binanceCoin">
					<img src={binanceCoin} alt="binanceCoin" />
				</div>
				<div className="coinLogo polkadot">
					<img src={polkadot} alt="polkadot" />
				</div>
				<div className="coinLogo usdCoin">
					<img src={usdCoin} alt="usdCoin" />
				</div>
				<div className="coinLogo uniswap">
					<img src={uniswap} alt="uniswap" />
				</div>
				<div className="coinLogo bitcoinCash">
					<img src={bitcoinCash} alt="bitcoinCash" />
				</div>
				<div className="coinLogo xrp">
					<img src={xrp} alt="xrp" />
				</div>
				<div className="coinLogo cardano">
					<img src={cardano} alt="cardano" />
				</div>
				<div className="coinLogo tron">
					<img src={tron} alt="tron" />
				</div>
				<div className="coinLogo ethereumClassic">
					<img src={ethereumClassic} alt="ethereumClassic" />
				</div>
				<div className="coinLogo litecoin">
					<img src={litecoin} alt="litecoin" />
				</div>
				<div className="coinLogo dash">
					<img src={dash} alt="dash" />
				</div>
				<div className="intro">
					<p>
						Learn how cryptocurrencies works by
						<span> simulating</span> basically anything you can do with a real crypto wallet
					</p>
					<div className="buttons">
						<Link to="/signup" className="signupBtn">
							Get Started
						</Link>
						<Link to="/login" className="loginBtn">
							Login
						</Link>
					</div>
				</div>
				<div className="imgAndBlob">
					<img className="homepageIMG" src={PricesIMG} alt="homepage" />
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#D0E2FF"
							d="M42.9,-57.9C55,-50.3,63.7,-36.9,68,-22.4C72.3,-7.9,72.1,7.7,68.9,23.9C65.7,40,59.5,56.7,47.5,66.5C35.5,76.2,17.8,79.1,0.9,77.9C-16,76.7,-32.1,71.4,-47.5,62.8C-62.9,54.1,-77.7,42.1,-80.4,27.6C-83.1,13.1,-73.6,-3.9,-66.1,-19.8C-58.7,-35.8,-53.2,-50.8,-42.5,-58.8C-31.8,-66.8,-15.9,-67.8,-0.3,-67.5C15.4,-67.1,30.8,-65.4,42.9,-57.9Z"
							transform="translate(100 100)"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default SectionOne;
