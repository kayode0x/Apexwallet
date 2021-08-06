import { IoClose } from 'react-icons/io5';
import { BsArrowLeft } from 'react-icons/bs'
import './Messages.scss';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Messages = ({ user, modalUpMessages, setModalUpMessages, messageModal, setMessageModal }) => {
	const history = useHistory();
	const [singleMessageModal, setSingleMessage] = useState('');

	const handleRedirect = (message) => {
		if (message.redirect) history.push(message.redirect);
		if (message.hasModal === true) {
			setMessageModal(true);
			setSingleMessage(message);
		}
	};

	const openMessageModal = (message) => {
		return (
			<div className={`messageModal ${messageModal ? 'Show' : ''}`}>
				<div className="container">
					<div className="closeIcon" onClick={() => setMessageModal(false)}>
						<BsArrowLeft />
					</div>
					<p className="messageTitle">{message.title}</p>
					{message.image && <img src={message.image} alt={message.title} />}
					<div className="fromAndDate">
						{message.from && (
							<p className="messageFrom">
								{message.from}
								<span className="fromSpan">&#8226;</span>
							</p>
						)}
						<p className="messageDate">{moment(message.date).startOf('hour').fromNow()}</p>
					</div>
					<p className="messageText">{message.text}</p>
				</div>
			</div>
		);
	};

	//set the message to unread after opening it.
	const handleOpenMessage = async (messageId) => {
		const apiURL = 'https://api.apexwallet.app/v1';
		const message = { messageId };
		try {
			await axios.put(`${apiURL}/message/open-message`, message, { withCredentials: true }).catch(async (err) => {
				await toast.error(err.response.data, {});
			});
		} catch (error) {
			console.log('ERROR: ', error);
		}
	};

	return (
		<>
			<div className={`messages ${modalUpMessages ? 'Show' : ''}`}>
				<div
					className="closeIcon"
					onClick={() => {
						setModalUpMessages(false);
						setMessageModal(false);
					}}
				>
					<IoClose />
				</div>
				<div
					className="closeIconMobile"
					onClick={() => {
						setModalUpMessages(false);
						setMessageModal(false);
					}}
				>
					<BsArrowLeft />
				</div>
				<div className="messagesHeader">Notifications</div>

				{/* sort each message by date */}
				{user.messages.length > 0 ? (
					user.messages
						.sort(function (a, b) {
							if (a.date < b.date) {
								return 1;
							}
							if (a.date > b.date) {
								return -1;
							}
							return 0;
						})
						.map((message) => (
							<div
								key={message._id}
								onClick={() => {
									handleOpenMessage(message._id);
									handleRedirect(message);
								}}
								className="messagesDiv"
							>
								<p
									style={{
										fontWeight: message.isRead ? '500' : 'bold',
										color: message.isRead ? '#080809' : '#0066ff',
									}}
									className="messageTitle"
								>
									{message.title}
								</p>
								<p className="messageText">{message.text}</p>
								<div className="fromAndDate">
									<p className="messageDate">{moment(message.date).startOf('hour').fromNow()}</p>
									{message.from && (
										<p className="messageFrom">
											<span className="fromSpan">&#8226;</span>
											{message.from}
										</p>
									)}
								</div>
							</div>
						))
				) : (
					<p className="noMessages">Nothing to see here yet</p>
				)}
			</div>
			{messageModal && openMessageModal(singleMessageModal)}
		</>
	);
};

export default Messages;
