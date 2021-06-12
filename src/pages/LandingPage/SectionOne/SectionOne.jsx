import './SectionOne.scss';
import { Link } from 'react-router-dom';
import HomepageIMG from '../../../assets/mockups/IMG_5418.PNG';
import coinIMG from '../../../assets/mockups/IMG_5417.PNG';
import PricesIMG from '../../../assets/mockups/IMG_5420.PNG';
import Lightening from '../../../assets/landingLogos/high-voltage.png';
import News from '../../../assets/landingLogos/newspaper.png';
import Fire from '../../../assets/landingLogos/fire.png';
import Sparkle from '../../../assets/landingLogos/sparkle.png';
import One from '../../../assets/landingLogos/one.png';
import Two from '../../../assets/landingLogos/two.png';
import Three from '../../../assets/landingLogos/three.png';
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
import { FaTwitter, FaInstagram } from 'react-icons/fa';

const SectionOne = () => {
	return (
		<>
			<div className="sectionOne">
				<div className="container">
					<img src={PricesIMG} alt="homepage" />
					<p>
						Get real time market information on your favorite cryptocurrencies, watch them to keep track and
						also trade virtually, <span>risk free</span>.
					</p>
				</div>
			</div>

			<div className="sectionTwo">
				<div className="featuresHeader">
					<img src={Sparkle} alt="Sparkle" />
					<p>Some Features</p>
					<img src={Sparkle} alt="Sparkle" />
				</div>
				<div className="container">
					<div className="feature one">
						<div className="heading">
							<p>Trading</p>
							<img src={Lightening} alt="Lightening" />
						</div>
						<span>
							You get to simulate buying and selling with real time data. You can also send and receive.
						</span>
					</div>
					<div className="feature two">
						<div className="heading">
							<p>Multiple Coins</p>
							<img src={Fire} alt="Fire" />
						</div>
						<span>
							Starting with 15 cryptocurrencies, more would be added based on popularity and demand.
						</span>
					</div>
					<div className="feature three">
						<div className="heading">
							<p>News</p>
							<img src={News} alt="news" />
						</div>
						<span>
							See the latest things going on to keep yourself informed, and also tips on how do do stuffs.
						</span>
					</div>
				</div>
			</div>

			<div className="sectionThree">
				<div className="container">
					<div className="listAndGetStarted">
						<p className="getStarted">Get Started in 3 steps:</p>
						<ul>
							<li>
								<div className="header">
									<img src={One} alt="index finger" />
									<p>Create An Account</p>
								</div>
								<p>
									<a href="/signup">Sign up</a> with your email address, you will receive a
									verification link, click on it to verify your account.
								</p>
							</li>
							<li>
								<div className="header">
									<img src={Two} alt="peace finger" />
									<p>Create A Wallet</p>
								</div>
								<p>Once you log back in, got to the wallet tab and hit "create wallet".</p>
							</li>
							<li>
								<div className="header">
									<img src={Three} alt="idek finger" />
									<p>Voila!</p>
								</div>
								<p>
									At this point, you have full access to everything on apex. Don't hesitate to inform
									us if you run into any issue.
								</p>
							</li>
						</ul>
					</div>
					<div className="images">
						<img src={HomepageIMG} alt="PricesIMG" />
					</div>
				</div>
			</div>

			<div className="sectionFour">
				<div className="container">
					<p className="getStarted">Starting with 15 cryptocurrencies</p>
					{/* All the logos go here */}
					<div className="logos">
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
					</div>
					<p className="moreCoins">More would be added based on popularity and demand.</p>
				</div>
			</div>

			<div className="sectionFive">
				<div className="container">
					<img src={coinIMG} alt="coin" />
					<div className="info">
						<p>
							The basic idea behind Apex is that if you are a newbie, you get to learn how things work.
							Play safe, start <span>simulating</span> today!
						</p>
						<div className="buttons">
							<Link to="/signup" className="signupBtn">
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="sectionSix">
				<div className="container">
					<p className="support">
						Please let us know about your feedbacks, questions or concerns to ensure we continue to serve
						you well.
					</p>
					<div className="contact">
						<p>support@apexwallet.app</p>
						<div className="icons">
							<a href="https://twitter.com/apexwallet" className="twitter">
								<FaTwitter />
							</a>
							<a href="https://instagram.com/apexwallet" className="instagram">
								<FaInstagram />
							</a>
						</div>
					</div>
				</div>

				<footer>Apex Wallet, from Werrey Inc 🦄. &copy; 2021</footer>
			</div>
		</>
	);
};

export default SectionOne;
