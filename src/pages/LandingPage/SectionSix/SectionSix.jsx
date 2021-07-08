import { FaTwitter, FaInstagram } from 'react-icons/fa';
import './SectionSix.scss'

const SectionSix = () => {
	return (
		<div className="sectionSix">
			<div className="container">
				<p className="support">
					Please let us know about your feedbacks, questions or concerns to ensure we continue to serve you
					well.
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
	);
};

export default SectionSix;
