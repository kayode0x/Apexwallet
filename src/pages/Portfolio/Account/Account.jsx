import './Account.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotateSpinner } from 'react-spinners-kit';
import BottomNav from '../../../components/BottomNav/BottomNav';
import usrIMG from '../../../assets/logo/userIMG.svg';
import StatusModal from './StatusModal/Modal';
import { HiSpeakerphone } from 'react-icons/hi';
import { MdInfo } from 'react-icons/md';
import PasswordModal from './PasswordModal/PasswordModal';
import NameModal from './NameModal/NameModal';
import { FiChevronRight } from 'react-icons/fi';
import { IoCamera } from 'react-icons/io5';
import useTitle from '../../../utils/useTitle';
import Image from './Image/Image';
import Learn from './LearningModal/Learn';

const Account = ({ loggedIn, user }) => {
	const history = useHistory();
	useTitle('Account | Apexwallet');
	const apiURL = 'https://api.apexwallet.app/v1';
	const [imageModal, setImageModal] = useState(false);

	useEffect(() => {
		if (loggedIn === false) {
			history.push('/login');
		}
	}, [loggedIn, history]);

	//log the user out
	const handleLogOut = async () => {
		try {
			await axios
				.post(`${apiURL}/auth/logout`)
				.then(history.push('/login'))
				.catch(async (err) => {
					await toast.error(`${err.response.data}`, {});
				});
		} catch (error) {
			console.log('Error: ' + error);
		}
	};

	return (
		<div className="account">
			<BottomNav />
			<div className="container">
				<p className="header">Account</p>
				{user ? (
					<>
						<div className="accountInfo">
							<div className="userDetails">
								<div className="nameAndImage">
									<div className="image">
										<img src={user.image ? user.image : usrIMG} alt={user.username} />
										<div onClick={() => setImageModal(!imageModal)} className="cameraIcon">
											<IoCamera />
										</div>
									</div>
									<div className="nameAndStatus">
										<p style={{ textTransform: user.name ? '' : 'capitalize' }}>
											{user.name ? user.name : user.username + ' 🚀'}
										</p>
										<p>{user.username}</p>
									</div>
								</div>
								<NameModal user={user} />
								<div className="personalFieldEmail">
									<div className="nameAndDisplay">
										<p className="displayLabel">Email</p>
										<p className="displayValue">{user.email}</p>
									</div>
								</div>
								<PasswordModal user={user} />

								<StatusModal user={user} />

								<Learn />

								<div onClick={() => alert('Coming Soon.')} className="reachOutField">
									<div className="accountIcons">
										<HiSpeakerphone />
									</div>
									<p>Reach Out</p>
									<div className="editIcon">
										<FiChevronRight />
									</div>
								</div>

								<div onClick={() => history.push('/about')} className="aboutUsField">
									<div className="accountIcons">
										<MdInfo />
									</div>
									<p>About Us</p>
									<div className="editIcon">
										<FiChevronRight />
									</div>
								</div>
							</div>

							{/* button to log the user out */}
							<button onClick={handleLogOut} className="signOut">
								Sign Out
							</button>

							<p className="walletVersion">v1.1 - beta 🚀</p>
							<p className="copyright">
								from <br />
								<span>Decover</span>
							</p>
						</div>

						{/* display image modal */}
						<Image setImageModal={setImageModal} imageModal={imageModal} />
						<div
							className={`Overlay ${imageModal ? 'Show' : ''}`}
							onClick={() => setImageModal(!imageModal)}
						/>
					</>
				) : (
					<div className="loading">
						<RotateSpinner size={40} color="#080809" />
					</div>
				)}
			</div>
			<ToastContainer hideProgressBar autoClose={3000} />
		</div>
	);
};

export default Account;
