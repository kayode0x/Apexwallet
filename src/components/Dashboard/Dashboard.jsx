import './Dashboard.scss';
import AuthContext from '../Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
    const history = useHistory();
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
    const [data, setData] = useState(null)
    const [wallet, setWallet] = useState(null)
    const apiURL = 'https://apex-backend.herokuapp.com';

    useEffect(() => {
        async function load() {
			await getLoggedIn();
			if (loggedIn === false) {
                history.push('/login')
            } else if (loggedIn === true){
                try {
					let user = await axios.get(`${apiURL}/api/v1/user/`, {withCredentials: true}).catch(async (err) => {
						await toast.dark(`${err.response.data.message}`, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					setData(user.data.message);
					console.log(user.data);
				} catch (error) {
					console.log('ERROR' + error.response);
				}

				try {
					let wallet = await axios.get(`${apiURL}/api/v1/wallet/`).catch(async (err) => {
						await toast.dark(err.response.data.message, {
							position: toast.POSITION.TOP_CENTER,
						});
					});
					setWallet(wallet.data);
					console.log(wallet.data);
					console.log('WALLET' + wallet);
				} catch (error) {
					console.log('ERROR: ', error);
				}
            }
		}
        load();
    },[getLoggedIn, loggedIn, history])
    
    return (
		<div className="dashboard">
			{loggedIn === true && (
				<div>
					{data && (
						<>
							<h1>{data.name ? data.name : 'Name pls'}</h1>
							<h1>{data.username ? data.username : 'username pls'}</h1>
							<h1>{data.email}</h1>
							<h1>{data.image ? data.image : 'Image Pls'}</h1>
						</>
					)}
					{wallet && (
						<>
							<h1>{wallet.message ? wallet.message : ''}</h1>
						</>
                    )}
				</div>
			)}
			<ToastContainer />
		</div>
	);
}

export default Dashboard;