import './Modal.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { GoUnverified, GoVerified } from 'react-icons/go';
import notAllowedIcon from '../../../../assets/logo/appl-274c-160.png';
import allowedIcon from '../../../../assets/logo/appl-2705-160.png';
import moneyMouth from '../../../../assets/logo/moneyMouth.png';
import unamusedEmoji from '../../../../assets/logo/unamusedEmoji.png';
import { FiChevronRight } from 'react-icons/fi';

export default function StatusModal({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<div style={{ width: '100%' }}>
			<div className="statusField" onClick={handleOpenModal}>
				<div className="accountIcons">{user.isActive === true ? <GoVerified /> : <GoUnverified />}</div>
				<p>Status</p>
				<span style={{ background: user.isActive === true ? '#109648' : '#BF211E' }}>
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
									<p>Send and Receive crypto</p>
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
									<p>Coin Conversion (TBA)</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Coin Locking (TBA)</p>
								</div>
								<div>
									<img
										src={user.isActive === true ? allowedIcon : notAllowedIcon}
										alt="not allowed"
									/>
									<p>Borrow crypto (TBA)</p>
								</div>
								<div>
									<img src={allowedIcon} alt="not allowed" />
									<p>Track assets</p>
								</div>

								<div className="privilegesNote">
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
												Account unverified! There's nothing much you can do yet
												<img src={unamusedEmoji} alt="unamused emoji" />
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
