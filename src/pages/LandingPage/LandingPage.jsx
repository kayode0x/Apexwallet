import './LandingPage.scss';
import { Link } from 'react-router-dom';
import bitcoin from '../../assets/landingLogos/bitcoin.png';
import ethereum from '../../assets/landingLogos/ethereum.png';
import tether from '../../assets/landingLogos/tether.png';
import dogecoin from '../../assets/landingLogos/dogecoin.png';
import binanceCoin from '../../assets/landingLogos/binance-coin.png';
import cardano from '../../assets/landingLogos/cardano.png';
import usdCoin from '../../assets/landingLogos/usd-coin.png';
import uniswap from '../../assets/landingLogos/uniswap.png';
import bitcoinCash from '../../assets/landingLogos/bitcoin-cash.png';
import xrp from '../../assets/landingLogos/xrp.png';
import tron from '../../assets/landingLogos/tron.png';
import ethereumClassic from '../../assets/landingLogos/ethereum-classic.png';
import litecoin from '../../assets/landingLogos/litecoin.png';
import dash from '../../assets/landingLogos/dash.png';
import polkadot from '../../assets/landingLogos/polkadot-new.png';
import SectionOne from './SectionOne/SectionOne'

const LandingPage = () => {
	return (
		<>
			<div className="landingPage">
				{/* All the logos go here */}
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
				<div className="mainContainer">
					<div className="container">
						<p className="mainText">
							Learn how cryptocurrencies works by 
							<span> simulating</span> basically anything you can do with a real crypto wallet, plus extra
							features.
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
				</div>
				<footer>Apex Wallet, from Werrey Inc.</footer>
			</div>

			<SectionOne />
		</>
	);
};

export default LandingPage;
