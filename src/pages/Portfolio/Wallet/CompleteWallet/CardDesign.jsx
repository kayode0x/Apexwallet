import './CardDesign.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { RotateSpinner } from 'react-spinners-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alienIMG from '../../../../assets/logo/alienIMG.png';
import astronautIMG from '../../../../assets/logo/astronautIMG.png';
import sunIMG from '../../../../assets/logo/sunIMG.png';
import saturnIMG from '../../../../assets/logo/saturnIMG.png';

export default function CardDesign({ user, BsThreeDotsVertical }) {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => {
		setOpenModal(false);
	};
	const [changing, setChanging] = useState(false);

	const cardDesignEndpoint = 'https://api.apexwallet.app/api/v1/user/card-design';

	//change the user's password
	const handleCardDesignChange = async (cardDesign) => {
		setChanging(true);

		const newCardDesign = { cardDesign };

		try {
			await axios
				.put(cardDesignEndpoint, newCardDesign)
				.then(async (res) => {
					await toast.success(res.data, {});
					setChanging(false);
					setOpenModal(false);
				})
				.catch(async (err) => {
					await toast.error(err.response.data, {});
					setChanging(false);
				});
		} catch (err) {
			console.log('ERROR: ', err);
			setChanging(false);
		}
	};

	return (
		<div style={{ width: '100%' }}>
			<div className="cardOptions">
				<BsThreeDotsVertical onClick={handleOpenModal} />
			</div>
			<Modal
				open={openModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				onClose={handleCloseModal}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openModal}>
					<div className="cardDesignModalContainer">
						<div
							style={{ background: changing && 'transparent', height: changing && '5rem' }}
							className="cardDesignModalSubContainer"
						>
							{changing ? (
								<div className="loading">
									<RotateSpinner size={40} color="#080809" />
								</div>
							) : (
								<>
									<p>Select A New Card Design</p>
									<div
										onClick={async () => {
											handleCardDesignChange('alienSVG');
										}}
										className="alienSVG"
									>
										<img src={alienIMG} alt="alien" />
									</div>
									<div
										onClick={async () => {
											handleCardDesignChange('astronautSVG');
										}}
										className="astronautSVG"
									>
										<img src={astronautIMG} alt="astronaut" />
									</div>
									<div
										onClick={async () => {
											handleCardDesignChange('saturnSVG');
										}}
										className="saturnSVG"
									>
										<img src={saturnIMG} alt="saturn" />
									</div>
									<div
										onClick={async () => {
											handleCardDesignChange('sunSVG');
										}}
										className="sunSVG"
									>
										<img src={sunIMG} alt="sun" />
									</div>
								</>
							)}
						</div>
					</div>
				</Fade>
			</Modal>
			<ToastContainer hideProgressBar autoClose={3000} />
		</div>
	);
}
