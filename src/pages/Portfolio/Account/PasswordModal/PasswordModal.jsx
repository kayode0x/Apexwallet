import './PasswordModal.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { RotateSpinner } from 'react-spinners-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from 'react-icons/io5';
import { FiChevronRight } from 'react-icons/fi';

export default function PasswordModal({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => {
		setOpenModal(false);
		setCurrentPassword('');
		setConfirmCurrentPassword('');
		setNewPassword('');
	};
	const [currentPassword, setCurrentPassword] = useState('');
	const [confirmCurrentPassword, setConfirmCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [changingPassword, setChangingPassword] = useState(false);

	const passwordChangeEndpoint = 'https://api.apexwallet.app/api/v1/user/change-password';

	//change the user's password
	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setChangingPassword(true);
		const userPassword = { currentPassword, confirmCurrentPassword, newPassword };
		try {
			if (currentPassword !== confirmCurrentPassword) {
				toast.error('Passwords do not match', {
					
				});
				setChangingPassword(false);
			} else {
				await axios
					.put(passwordChangeEndpoint, userPassword)
					.then((res) => {
						if (res.status === 200) {
							toast.success(`${res.data}`, {
								
							});
							handleCloseModal();
							setChangingPassword(false);
						}
					})
					.catch(async (err) => {
						toast.error(`${err.response.data}`, {
							
						});
						setChangingPassword(false);
					});
			}
		} catch (error) {
			console.log('Error: ' + error);
			setChangingPassword(false);
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="personalFieldPassword" onClick={handleOpenModal}>
				<div className="nameAndDisplay">
					<p className="displayLabel">Password</p>
					<p className="displayValue">**********</p>
				</div>
				<div className="editIcon">
					<FiChevronRight />
				</div>
			</div>
			<Modal
				open={openModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModal}>
					<div className="passwordModalContainer">
						<div className="passwordModalSubContainer">
							<button
								disabled={changingPassword ? true : false}
								onClick={handleCloseModal}
								className="closePasswordModal"
							>
								<IoClose />
							</button>
							<p>Change Password</p>
							<form onSubmit={handlePasswordChange}>
								<div className="currentPasswordInput">
									<input
										type="password"
										id="currentPassword"
										minLength="6"
										name="currentPassword"
										placeholder="Current Password"
										required
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
									/>
								</div>

								<div className="confirmCurrentPasswordInput">
									<input
										type="password"
										id="confirmCurrentPassword"
										minLength="6"
										name="confirmCurrentPassword"
										placeholder="Confirm Password"
										required
										value={confirmCurrentPassword}
										onChange={(e) => setConfirmCurrentPassword(e.target.value)}
									/>
								</div>

								<div className="newPasswordInput">
									<input
										type="password"
										id="newPassword"
										minLength="6"
										name="newPassword"
										placeholder="New Password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>

								<button className="submitBtn" disabled={changingPassword ? true : false} type="submit">
									{changingPassword ? <RotateSpinner size={30} color="#fff" /> : 'Submit'}
								</button>
							</form>
						</div>
					</div>
				</Fade>
			</Modal>
			<ToastContainer hideProgressBar autoClose={3000} />
		</div>
	);
}
