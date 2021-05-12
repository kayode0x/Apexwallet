import './Verify.scss';
import astronaut from '../../assets/logo/astronaut-ingravity.svg';
import { useState, useEffect } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Verify = () => {
    const history = useHistory();
	const [verifying, setVerifying] = useState(false);

    useEffect(() => {
		async function verifyUser() {
			setVerifying(true);
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const token = urlParams.get('token');
			const user = { token };
			const apiURL = 'https://api.apexwallet.app/api/v1';

			try {
                await axios
					.put(`${apiURL}/auth/verify`, user, { withCredentials: true })
					.then(async (res) => {
						console.log('RES: ', res);
						if (res.status === 200) {
							await toast.dark(`${res.data}`, {
								position: toast.POSITION.TOP_CENTER,
							});

							setTimeout(() => {
								history.push('/login');
							}, 5000);

							setVerifying(false);
						}
					})
					.catch(async (err) => {
						//if error, display the custom error message from the server with toastify.
						await toast.dark(`${err.response.data}`, {
							position: toast.POSITION.TOP_CENTER,
						});
						setTimeout(() => {
							history.push('/login');
						}, 3000);
					});
            } catch (error) {
                console.log(error)
            }

			setVerifying(false);
		}


        verifyUser();
	}, [history])


	return (
		<HelmetProvider>
			<div className="verify">
				<Helmet>
					<title>Verify - Apex</title>
				</Helmet>
				<div className="container">
					<div className="assets">
						<img src={astronaut} alt="astronaut" />
						<div className="circle"></div>
					</div>
					<div className="verifying">{verifying && <RotateSpinner size={50} color="#fff" />}</div>
				</div>
			</div>
			{/* {DON'T FORGET THE TOASTIFY} */}
			<ToastContainer />
		</HelmetProvider>
	);

};

export default Verify;
