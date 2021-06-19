import HomepageIMG from '../../../assets/mockups/IMG_5523.PNG';
import HomepageIMG2 from '../../../assets/mockups/IMG_5417.PNG';
import One from '../../../assets/landingLogos/one.png';
import Two from '../../../assets/landingLogos/two.png';
import Three from '../../../assets/landingLogos/three.png';
import './SectionThree.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SectionThree = () => {
	const matches = useMediaQuery('(min-width:1024px)');
	return (
		<div className="sectionThree">
			<div className="container">
				<div className="images">
					{matches ? <img src={HomepageIMG} alt="PricesIMG" /> : <img src={HomepageIMG2} alt="PricesIMG" />}
				</div>
				<div className="listAndGetStarted">
					<p className="getStarted">Get Started in 3 steps</p>
					<ul>
						<li>
							<div className="imgDiv">
								<img src={One} alt="index finger" />
							</div>
							<div className="header">
								<p>Create An Account</p>
								<span>
									<a href="/signup">Sign up</a> with your email address, you will receive a
									verification link, click on it to verify your account.
								</span>
							</div>
						</li>
						<li>
							<div className="imgDiv">
								<img src={Two} alt="peace finger" />
							</div>
							<div className="header">
								<p>Create A Wallet</p>
								<span>Once you log back in, got to the wallet tab and hit "create wallet".</span>
							</div>
						</li>
						<li>
							<div className="imgDiv">
								<img src={Three} alt="idek finger" />
							</div>
							<div className="header">
								<p>Voila!</p>
								<span>
									At this point, you have full access to everything on apex. Don't hesitate to inform
									us if you run into any issue.
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SectionThree;
