// import Style from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom'
import logoFreshCart from '../../Assets/freshcart-logo.svg'
import { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { cartContext } from '../../Context/CartContext'

export default function Navbar() {
    let { token, setToken, user } = useContext(tokenContext)
    let {numOfCartItems} = useContext(cartContext)
    let navigate = useNavigate()
    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        navigate('login')
    }
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={token ? '/products' : '/'}>
                    <img src={logoFreshCart} alt="logoFreshCart" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="products">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="cart">Cart</NavLink>
                        </li>
                    </ul> : ''}


                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {token ? <>
                            <li className="nav-item">
                                <span className="nav-link text-main" >Welcome {user}</span>
                            </li>
                            <li className="nav-item d-flex  justify-content-start">
                                <NavLink className="nav-link d-flex flex-column align-items-center me-auto justify-content-start" to="cart">
                                    <span style={{fontSize:'.7rem', bottom:'25px' , left:'15px'}} className=' text-main '>{numOfCartItems}</span>
                                    <i className="fa-brands fa-opencart text-main"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link cursor-pointer" onClick={logout}>Log out</span>
                            </li>
                        </>
                            : <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Sign up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="login">Log in</NavLink>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
