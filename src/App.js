import axios from 'axios';
import { AuthContextProvider } from './components/Auth/AuthContext';
import Routes from './Routes';
import './App.css';
axios.defaults.withCredentials = true;



function App() {
  
  return (
		<AuthContextProvider>
			<div className="App">
				<Routes />
			</div>
		</AuthContextProvider>
  );
}

export default App;
