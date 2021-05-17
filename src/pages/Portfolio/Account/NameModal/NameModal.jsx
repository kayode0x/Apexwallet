import './NameModal.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { RotateSpinner } from 'react-spinners-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from 'react-icons/io5';

export default function NameModal({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => {
		setOpenModal(false);
		setName('');
	};
	const [name, setName] = useState('');
	const [changingName, setChangingName] = useState(false);

	const nameChangeEndpoint = 'https://api.apexwallet.app/api/v1/user/change-name';

	//change the user's password
	const handleNameChange = async (e) => {
		e.preventDefault();
		setChangingName(true);
		const displayName = { name };
		try {
			if (name === '' || name.length === 0 || name.trim().length === 0) {
				toast.dark('Name can not be blank', {
					position: toast.POSITION.TOP_CENTER,
				});
				setChangingName(false);
			} else if (name.length > 20 ){
                toast.dark('Name can not be more than 20 characters', {
					position: toast.POSITION.TOP_CENTER,
				});
				setChangingName(false);
            } else {
                name.trim();
				await axios
					.put(nameChangeEndpoint, displayName)
					.then((res) => {
						if (res.status === 200) {
							toast.dark(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});
							handleCloseModal();
							setChangingName(false);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
						}
					})
					.catch(async (err) => {
						toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
						setChangingName(false);
					});
			}
		} catch (error) {
			console.log('Error: ' + error);
			setChangingName(false);
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="personalFieldName">
				<div className="nameAndDisplay">
					<p className="displayLabel">Display Name</p>
					<p className="displayValue">{user.name ? user.name : 'No name yet'}</p>
				</div>
				<div className="editButton">
					<button onClick={handleOpenModal}>Edit</button>
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
					<div className="nameModalContainer">
						<div className="nameModalSubContainer">
							<button
								disabled={changingName ? true : false}
								onClick={handleCloseModal}
								className="closeNameModal"
							>
								<IoClose />
							</button>
							<p>Edit Display Name</p>
							<form onSubmit={handleNameChange}>
								<div className="displayNameInput">
									<input
										type="text"
										id="name"
										maxLength="20"
										name="name"
										placeholder={user.name}
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<button className="submitBtn" disabled={changingName ? true : false} type="submit">
									{changingName ? <RotateSpinner size={30} color="#fff" /> : 'Submit'}
								</button>
							</form>
						</div>
					</div>
				</Fade>
			</Modal>
			<ToastContainer autoClose={3000} />
		</div>
	);
}
