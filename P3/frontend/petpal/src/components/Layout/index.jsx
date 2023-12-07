import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";
import './style.css';

const Layout = () => {
    const { userName } = useContext(APIContext);
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

    return <>
        <header>
            <nav className="navbar navbar-expand-sm bg-primary">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-light">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/petListings" className="nav-link text-light">Pet Listings</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Notifications" className="nav-link text-light">Notifications</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/games" className="nav-link text-light">Games</Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link text-light">Hello, {userName}</div>
                    </li>
                </ul>
            </nav>
        </header>
        <main className="p-5">
            <h1 className="text-dark text-center m-0">PetPal</h1>
            <Outlet />
        </main>
        <footer className="bg-primary">
            <div className="text-light text-center">&copy; CSC309 Lecture 14c, {semester} {today.getFullYear()}.</div>
        </footer>
    </>;
}

export default Layout;