import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import './style.css';

const Layout = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    const today = new Date();
    var semester;

    switch (today.getMonth()) {
        case 1:
        case 2:
        case 3:
        case 4:
            semester = "Winter";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            semester = "Summer";
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            semester = "Fall";
            break;
        default:
            semester = "Unknown";
    }

    const logout = () => {
        localStorage.setItem("apiToken", "");
        localStorage.setItem("userName", "");
        localStorage.setItem("apiId", 0);
        localStorage.setItem("seeker_or_shelter", false);
        navigate('/login');
    }

    return <>
        <header>
            <nav className="navbar navbar-expand-sm bg-primary">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-light">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/petListings" className="nav-link text-light">Pet Listings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Applications" className="nav-link text-light">Applications</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Notifications" className="nav-link text-light">Notifications</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shelters" className="nav-link text-light">Shelters</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/blogs" className="nav-link text-light">Blogs</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/currProfile" className="nav-link text-light">{localStorage.getItem("userName")} Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link text-light">Login</Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={logout} className="nav-link text-light">Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
        <main className="p-3">
            <h1 className="text-dark text-center m-0">PetPal</h1>
            <Outlet />
        </main>
        <footer className="bg-primary">
            <div className="text-light text-center">PetPal</div>
        </footer>
    </>;
}

export default Layout;