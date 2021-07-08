import './Learn.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { GiWhiteBook } from 'react-icons/gi';
import { FiChevronRight } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

export default function Learn() {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<div style={{ width: '100%' }}>
			<div className="learnField" onClick={handleOpenModal}>
				<div className="accountIcons">
					<GiWhiteBook />
				</div>
				<p>Learn</p>
				<span>
					Coming Soon
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
					<div className="learnModalContainer">
						<div className="learnModalSubContainer">
							<div className="header">Learn</div>
							<div className="body">
								<p className="intro">
									We'll teach you all you need to know regarding cryptocurrencies, from the
									fundamentals to when to buy and sell. We'll also provide you with market updates and
									predictions. It is user-friendly for beginners as well as seasoned traders.
								</p>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
