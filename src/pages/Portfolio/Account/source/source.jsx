import './source.scss';
import { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { RiFileCodeFill } from "react-icons/ri";
import { FiChevronRight } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

export default function Source() {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => {
    setOpenModal(false);
    setCount(0);
  };
  const [ count, setCount ] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  }

	return (
    <div style={{ width: "100%" }}>
      <div onClick={handleOpenModal} className="reachOutField">
        <div className="accountIcons">
          <RiFileCodeFill />
        </div>
        <p>Source Codes</p>
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
          <div className="sourceModalContainer">
            <div className="sourceModalSubContainer">
              <div className="body">
                <p
                  style={{ display: count === 0 ? "block" : "none" }}
                  className="intro"
                >
                  This project was created out of curiosity and as a way to
                  learn more about React and Node.js as a beginner.
                </p>

                <p
                  style={{ display: count === 1 ? "block" : "none" }}
                  className="intro"
                >
                  Tech stack is React, Node.js with Express, MongoDB, AWS (S3)
                  and hosted on Netlify (frontend), Digital Ocean (backend).
                </p>

                <p
                  style={{
                    display: count === 2 ? "flex" : "none",
                    flexDirection: "column",
                  }}
                  className="intro"
                >
                  Lastly, I won't put more efforts on this project, but I'm open
                  to reviews and suggestions, thanks.
                  <span style={{ fontWeight: "bold" }}> Kayode.</span>
                </p>
                
                {count < 2 ? (
                  <button onClick={increaseCount}>Next</button>
                ) : (
                  <a
                    href="https://github.com/kayode0x/apexwallet"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
