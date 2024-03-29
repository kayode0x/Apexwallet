import './Verify.scss';
// import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useEffect } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useTitle from '../../utils/useTitle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Verify = () => {
	const history = useHistory();
	const [verifying, setVerifying] = useState(false);
	useTitle('Verify | Apexwallet');

	useEffect(() => {
		async function verifyUser() {
			setVerifying(true);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const token = urlParams.get('token');
			if (token === null) {
				history.push('/login');
			}
			const user = { token };
			const apiURL = 'https://api.apexwallet.app/v1';

			try {
				await axios
					.post(`${apiURL}/auth/verify`, user, { withCredentials: true })
					.then(async (res) => {
						if (res.status === 200) {
							await toast.success(`${res.data}`, {});

							setTimeout(() => {
								history.push('/dashboard');
							}, 3000);

							setVerifying(false);
						}
					})
					.catch(async (err) => {
						//if error, display the custom error message from the server with toastify.
						await toast.error(`${err.response.data}`, {});
						setTimeout(() => {
							history.push('/login');
						}, 3000);
					});
			} catch (error) {
				console.log(error);
			}

			setVerifying(false);
		}

		verifyUser();
	}, [history]);

	return (
		<>
			<div className="verify">
				<div className="container">
					{/* <div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div> */}
					<div className="verifying">{verifying && <RotateSpinner size={40} color="#000" />}</div>
				</div>
			</div>

			<ToastContainer hideProgressBar autoClose={3000} />
		</>
	);
};

export default Verify;
