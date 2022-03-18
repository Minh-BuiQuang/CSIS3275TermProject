import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const pathMatchRoute = (route) => {
        return route === location.pathname
    }

    const empName = localStorage.getItem('empName');

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand">CLOTHING STOCK MANAGEMENT</span>
                    <span className="float-right text-light">{empName} {empName &&<span role="button" className="text-success border border-success rounded p-2" onClick={()=>{localStorage.clear(); navigate('/')}}>Log Out</span> }</span>
                </div>
            </nav>

            <nav className="navbar container navbar-expand-lg navbar-light bg-light">
                <div className=" navbar-nav">
                    <h5 className="nav-item nav-link p-3"><NavLink to='/stock-records' className={`text-decoration-none ${pathMatchRoute('/stock-records') ? 'text-success' : 'text-dark'}`}>Stock Records</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/stock-in' className={`text-decoration-none ${pathMatchRoute('/stock-in') ? 'text-success' : 'text-dark'}`}>Stock In</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/stock-out' className={`text-decoration-none ${pathMatchRoute('/stock-out') ? 'text-success' : 'text-dark'}`}>Stock Out</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/current-stock' className={`text-decoration-none ${pathMatchRoute('/current-stock') ? 'text-success' : 'text-dark'}`}>Current Stock</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/suppliers' className={`text-decoration-none ${pathMatchRoute('/entity-list') ? 'text-success' : 'text-dark'}`}>Suppliers</NavLink></h5>
                    <h5 className="nav-item nav-link p-3"><NavLink to='/customers' className={`text-decoration-none ${pathMatchRoute('/entity-list') ? 'text-success' : 'text-dark'}`}>Customers</NavLink></h5>
                </div>
            </nav>
        </>
    )
}


export default Header;