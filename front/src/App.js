import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import ProtectedRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
    return (
        <div className="App app-container" style={{backgroundColor: '#EEEEEE', height: "100vh"}}>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoute  element={Home}/>} />
                <Route path="/login" element={<PublicRoute element={Login} />} />
                <Route path="/register" element={<PublicRoute element={Register} />} />
            </Routes>
        </div>
    );
}

export default App;
