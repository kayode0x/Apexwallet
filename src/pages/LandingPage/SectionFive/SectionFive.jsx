import './SectionFive.scss';
import { Link } from 'react-router-dom';
import coinIMG from '../../../assets/mockups/IMG_5418.PNG';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SectionFive = () => {
	const matches = useMediaQuery('(max-width:768px)');
	return (
		<div className="sectionFive">
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
	);
};

export default SectionFive;
