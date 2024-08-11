import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {logout, selectIsUserAuth} from '../features/auth/AuthSlice';


const Navbar = () => {
    const isAuthenticated = useSelector(selectIsUserAuth);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isAuthenticated && (
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                    </li>
                            )}
                            {!isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page"
                                          to="/register">Register</Link>
                                </li>
                            )}
                        </ul>
                        {isAuthenticated && (
                            <div>
                                <b style={{marginRight: "1rem"}}>{user?.username.toUpperCase()}</b>
                                <button className="btn btn-outline-success" type="submit"
                                        onClick={handleLogout}>Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
