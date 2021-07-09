import './Modal.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { GoUnverified, GoVerified } from 'react-icons/go';
import notAllowedIcon from '../../../../assets/logo/appl-274c-160.png';
import allowedIcon from '../../../../assets/logo/appl-2705-160.png';
import moneyMouth from '../../../../assets/logo/moneyMouth.png';
import { FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StatusModal({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const [sending, setSending] = useState(false);
	const apiURL = 'https://api.apexwallet.app/v1';

	const handleNewVerification = async () => {
		setSending(true);
		try {
			await axios
				.post(`${apiURL}/auth/resend-verification-link`)
				.then((res) => {
					if (res.status === 200) {
						toast.success(`${res.data}`, {
							hideProgressBar: true,
						});
						handleCloseModal();
						setSending(false);
					}
				})
				.catch(async (err) => {
					await toast.error(`${err.response.data}`, {});
					setSending(false);
				});
		} catch (error) {
			console.log('Error: ' + error);
			setSending(false);
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="statusField" onClick={handleOpenModal}>
				<div className="accountIcons">{user.isActive === true ? <GoVerified /> : <GoUnverified />}</div>
				<p>Status</p>
				<span style={{ background: user.isActive === true ? '#109648' : 'rgba(226, 37, 37, 1)' }}>
					{user.isActive === true ? 'Verified' : 'Unverified'}
				</span>
				<div className="editIcon">
					<FiChevronRight />
				</div>
			</div>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModal}>
					<div className="statusModalContainer">
						<div className="statusModalSubContainer">
							<div className="iconContainer">
								{user.isActive === true ? <GoVerified /> : <GoUnverified />}
							</div>
							<div className="privilegesContainer">
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Open a wallet</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Buy and Sell crypto</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Send and Receive crypto</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Coin Conversion</p>
								</div>
								<div>
									<img src={allowedIcon} alt="not allowed" />
									<p>Track assets</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Coin Locking (TBA)</p>
								</div>

								<div
									onClick={() => user.isActive === false && handleNewVerification()}
									className="privilegesNote"
								>
									{user.isActive === true ? (
										<>
											<p>
												Account verified! You can do as much as you like
												<img src={moneyMouth} alt="money mouth" />
											</p>
										</>
									) : (
										<>
											<p>
												{sending
													? 'Sending...'
													: 'Account unverified! Click here to resend a verification email'}
											</p>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
