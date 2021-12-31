import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import WritePost from './pages/writePost/WritePost';
import Single from './pages/Single/Single';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "./context/Context";

function App() {
	const { user } = useContext(Context);
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/post/:id" component={Single} />
				<Route exact path="/write" component={user ? WritePost : Register} />
				<Route exact path="/login" component={user ? Home : Login} />
				<Route exact path="/register" component={user ? Home : Register} />
				<Route exact path="/settings" component={user ? Settings : Register} />
			</Switch>
		</Router>
	);
}

export default App;
