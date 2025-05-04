import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ThemeSwitcher } from './ThemeSwitcher.jsx'
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/logo-mister-toy.png'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isThemeOpen, setIsThemeOpen] = useState(false)
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem("preferred-theme") || "theme-light")

    const themeMenuRef = useRef()

    // function onLogout() {
    //     logout()
    //         .then(() => showSuccessMsg('Logout successful'))
    //         .catch(() => showErrorMsg('Oops! Please try again'))
    // }

    useEffect(() => {
        function handleClickOutside(event) {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
                setIsThemeOpen(false)
            }
        }

        if (isThemeOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isThemeOpen])

    return (
        <header className="app-header full">
            <section className="header-container flex justify-between items-center">
                <NavLink to="/" className="logo-link">
                    <img className="logo-icon" src={logo} alt="Mister Toy Logo" />
                    <h1 className="logo">Mister Toy</h1>
                </NavLink>

                <nav className="app-nav flex">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/toy" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Toys</NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Login</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>About Us</NavLink>
                </nav>

                <div className="header-actions flex items-center relative">
                    {user && (
                        <section className="user-info flex items-center gap-2">
                            <span>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    )}

                    <div className="theme-menu-wrapper relative" ref={themeMenuRef}>
                        <button className="theme-toggle-btn" onClick={() => setIsThemeOpen(prev => !prev)}>
                            🎨
                        </button>

                        {isThemeOpen && (
                            <div className="theme-switcher-popup absolute top-full right-0 z-10">
                                <ThemeSwitcher setActiveTheme={setActiveTheme} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <UserMsg />
        </header>
    )
}
