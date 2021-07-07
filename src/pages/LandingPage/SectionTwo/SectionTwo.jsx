import Lightening from '../../../assets/landingLogos/high-voltage.png';
import News from '../../../assets/landingLogos/newspaper.png';
import Fire from '../../../assets/landingLogos/fire.png';
import './SectionTwo.scss'

const SectionTwo = () => {
	return (
		<div className="sectionTwo">
			<div className="featuresHeader">
				<p>Learn the basics</p>
				<p>Apexwallet helps you learn how things work, from the basics to when you should buy/sell. </p>
			</div>
			<div className="container">
				<div className="feature one">
					<div className="heading">
						<img src={Lightening} alt="Lightening" />
						<p>Trading</p>
					</div>
					<span>
						You get to simulate buying and selling with real time data. You can also send and receive.
					</span>
				</div>
				<div className="feature two">
					<div className="heading">
						<img src={Fire} alt="Fire" />
						<p>Multiple Coins</p>
					</div>
					<span>Starting with 15 cryptocurrencies, more would be added based on popularity and demand.</span>
				</div>
				<div className="feature three">
					<div className="heading">
						<img src={News} alt="news" />
						<p>Live News</p>
					</div>
					<span>
						Get to see the latest happenings to keep yourself informed, and also tips on how to trade, hold
						etc.
					</span>
				</div>
			</div>
		</div>
	);
};

export default SectionTwo;
