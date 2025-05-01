import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { UserMsg } from './UserMsg.jsx'

import logo from '../assets/img/logo-mister-toy.png'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successful')
            })
            .catch(() => {
                showErrorMsg('Oops! Please try again')
            })
    }

    return (
        <header className="app-header full">
            <section className="header-container flex justify-between items-center">
                <NavLink to="/" className="logo-link">
                    <img className="logo-icon" src={logo} alt="Mister Toy Logo" />
                    <h1 className="logo">Mister Toy</h1>
                </NavLink>
                <nav className="app-nav flex">
                    <nav className="app-nav">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/toy" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Toys</NavLink>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Login</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>About Us</NavLink>
                    </nav>
                </nav>
                {user && (
                    <section>
                        <span>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                        <button onClick={onLogout}>Logout</button>
                    </section>
                )}
            </section>
            <UserMsg />
        </header>
    )
}
