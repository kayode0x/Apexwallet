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
    <div style={{ width: "100%" }}>
      <div className="learnField" onClick={handleOpenModal}>
        <div className="accountIcons">
          <GiWhiteBook />
        </div>
        <p>Learn</p>
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
              <div className="body">
                <p className="intro">
                  Here are some crypto oriented lexicons to help you learn more
                  about the crypto world.
                </p>
                <a
                  href="https://apexwallet.s3.us-east-2.amazonaws.com/Crypto+Lexicons.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Take me there
                </a>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
