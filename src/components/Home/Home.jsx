import './Home.scss'
import rocketLogo from '../../assets/logo/appl-1f680-160.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
		<>
			{/* <div id="stars"></div> */}
			<div className="home">
				<div className="mainContainer">
					<div className="logo">
						<img src={rocketLogo} alt="rocket" />
					</div>
					<div className="container">
						<div className="name">Apex</div>
						<div className="mainText">
							Get real time market information on your favorite crypto currencies, watch them to keep
							track and also trade virtually, <span>risk free</span>.
						</div>
						<div className="buttons">
							<Link to="#" className="signup">
								Sign Up
							</Link>
							<Link to="#" className="login">
								Login
							</Link>
						</div>
					</div>
				</div>
				<footer>&#169; Werrey Inc. 2021.</footer>
			</div>
		</>
	);
}

export default Home;