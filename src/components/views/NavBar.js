import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();
    const [navigateNow, setNavigateNow] = useState(false);

    function logout() {
        localStorage.removeItem('loggedIn');
        setNavigateNow(true);
        // just adding here navigate('/'), doesn't work, that's why I had to add setNavigateNow(true) above and the useEffect below
        window.location.reload();
        //then had to add window.location.reload(); because the redirection works at first, but when I tried the same steps for the second time it didn't work, and so this fixed the problem
    }

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === null && navigateNow === true) {
            navigate('/');
        }
    }, [navigateNow, navigate]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <NavLink to={'/'} className="navbar-brand">BS-Store</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/products'} className="nav-link">Products</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink to={'/cart'} className="nav-link">Cart</NavLink>
                            </li>

                            {
                                localStorage.getItem('loggedIn') === null ?
                                    <li><NavLink className="nav-link p-1" to={'/Login'} ><h4 className='m-0 d-flex align-items-center'><i className="bi bi-box-arrow-in-right"></i></h4></NavLink></li>
                                    :
                                    <li><NavLink className="nav-link p-1" onClick={() => logout()} ><h4 className='m-0 d-flex align-items-center'><i className="bi bi-box-arrow-left"></i></h4></NavLink></li>
                            }
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default NavBar