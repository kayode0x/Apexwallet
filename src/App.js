import axios from 'axios';
import { AuthContextProvider } from './components/Auth/AuthContext';
import Routes from './Routes';
axios.defaults.withCredentials = true;


function App() {
  
  return (
	<AuthContextProvider>
		<Routes />
	</AuthContextProvider>
  );
}

export default App;
