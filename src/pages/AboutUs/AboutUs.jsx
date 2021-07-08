import { FaTwitter, FaInstagram } from 'react-icons/fa';
import './AboutUs.scss';
import { Link } from 'react-router-dom';
import coinIMG from '../../assets/mockups/IMG_5418.PNG';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import walletIMG from '../../assets/mockups/IMG_5605.PNG';
import sakuna from '../../assets/logo/sakunaRed.JPG';
import shelby from '../../assets/logo/shelby.jpeg';
import kakashi from '../../assets/logo/kakashi.jpeg';
import beerus from '../../assets/logo/beerus.jpeg';
import useTitle from '../../utils/useTitle';
import Nav from '../../components/TopNav/Nav';

const AboutUs = () => {
	const matches = useMediaQuery('(max-width:768px)');
	useTitle('About Us | Apexwallet');

	return (
		<div className="aboutUs">
			<Nav />
			<div className="container">
				<div className="headerAndImage">
					<img src={walletIMG} alt="wallet" />
					<div className="header">
						<p>About Apexwallet</p>
						<p>
							Our mission is to provide users with fundamental cryptocurrency insight and experience.
							Apexwallet is a simulated cryptocurrency wallet designed to teach how cryptocurrencies work,
							with more features. We believe the best cryptocurrency acumen should be available to
							everyone.
						</p>
					</div>
				</div>
				<div className="body">
					<p className="header">The Team</p>
					<div className="theTeam">
						<div className="kayode">
							<img src={sakuna} alt="img" />
							<p>Kayode</p>
							<p>Development</p>
						</div>
						<div className="victor">
							<img src={kakashi} alt="img" />
							<p>Victor</p>
							<p>Operations</p>
						</div>
						<div className="david">
							<img src={shelby} alt="img" />
							<p>Dave</p>
							<p>Finance</p>
						</div>
						<div className="bolu">
							<img src={beerus} alt="img" />
							<p>Bolu</p>
							<p>Marketing</p>
						</div>
					</div>
				</div>

				<div className="outro">
					<div className="container">
						{matches ? (
							<>
								<img src={coinIMG} alt="coin" />
								<div className="info">
									<p>
										Before splashing cash into cryptocurrencies, know the basics. Play safe, start{' '}
										<span>simulating</span> today!
									</p>
									<div className="buttons">
										<Link to="/signup" className="signupBtn">
											Get Started
										</Link>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="info">
									<p>
										Before splashing cash into cryptocurrencies, know the basics. Play safe, start{' '}
										<span>simulating</span> today!
									</p>
									<div className="buttons">
										<Link to="/signup" className="signupBtn">
											Get Started
										</Link>
									</div>
								</div>
								<img src={coinIMG} alt="coin" />
							</>
						)}
					</div>
				</div>

				<div className="footer">
					<div className="container">
						<p className="support">
							Please let us know about your feedbacks, questions or concerns to ensure we continue to
							serve you well.
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

					<footer>Apexwallet, from Decover &copy; 2021</footer>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
