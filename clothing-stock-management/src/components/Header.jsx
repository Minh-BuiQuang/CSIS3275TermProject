import { NavLink, useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const pathMatchRoute = (route) => {
        return route === location.pathname
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand">CLOTHING STOCK MANAGEMENT</span>
                    <span className="float-right text-light">Emp Name</span>
                </div>
            </nav>
            <nav className="navbar container navbar-expand-lg navbar-light bg-light">
                <div className=" navbar-nav">
                    <h5 className="nav-item nav-link p-3"><NavLink to='/' className={`text-decoration-none ${pathMatchRoute('/') ? 'text-success' : 'text-dark'}`}>Stock Records</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/stock-in' className={`text-decoration-none ${pathMatchRoute('/stock-in') ? 'text-success' : 'text-dark'}`}>Stock In</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/stock-out' className={`text-decoration-none ${pathMatchRoute('/stock-out') ? 'text-success' : 'text-dark'}`}>Stock Out</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/current-stock' className={`text-decoration-none ${pathMatchRoute('/current-stock') ? 'text-success' : 'text-dark'}`}>Current Stock</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/entity-list' className={`text-decoration-none ${pathMatchRoute('/entity-list') ? 'text-success' : 'text-dark'}`}>Entity List</NavLink></h5>
                </div>
                <form className="">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
            </nav>
        </>
    )
}


export default Header;