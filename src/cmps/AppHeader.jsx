import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { ThemeSwitcher } from './ThemeSwitcher.jsx'
import { UserMsg } from './UserMsg.jsx'
import logo from '../assets/img/logo-mister-toy.png'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isThemeOpen, setIsThemeOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem("preferred-theme") || "theme-light")

    const themeMenuRef = useRef()
    const mobileMenuRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
                setIsThemeOpen(false)
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev)
    }

    return (
        <header className="app-header">
            <section className="header-container">
                <NavLink to="/" className="logo-link">
                    <img className="logo-icon" src={logo} alt="Mister Toy Logo" />
                    <h1 className="logo">Mister Toy</h1>
                </NavLink>

                <nav className="app-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/toy" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Toys</NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Login</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>About Us</NavLink>
                </nav>

                <div className="header-actions">
                    {user && (
                        <section className="user-info">
                            <span>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                        </section>
                    )}

                    <div className="theme-menu-wrapper" ref={themeMenuRef}>
                        <button className="theme-toggle-btn" onClick={() => setIsThemeOpen(prev => !prev)}>
                            🎨
                        </button>

                        {isThemeOpen && (
                            <div className="theme-switcher-popup">
                                <ThemeSwitcher setActiveTheme={setActiveTheme} />
                            </div>
                        )}
                    </div>

                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>
            </section>

            <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} ref={mobileMenuRef}>
                <div className="mobile-nav-content">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={toggleMobileMenu}>Home</NavLink>
                    <NavLink to="/toy" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={toggleMobileMenu}>Toys</NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={toggleMobileMenu}>Login</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={toggleMobileMenu}>About Us</NavLink>

                    {user && (
                        <div className="mobile-user-info">
                            <section className="user-info">
                                <span>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                            </section>
                        </div>
                    )}
                </div>
            </nav>

            <UserMsg />
        </header>
    )
}