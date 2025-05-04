import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ThemeSwitcher } from '../cmps/ThemeSwitcher.jsx'

// import { CHANGE_BY } from "../store/reducers/user.reducer.js"

import homePageImage from '../assets/img/mister-toy-home-page.png'

export function HomePage() {
    const count = useSelector(storeState => storeState.count)
    const [activeTheme, setActiveTheme] = useState("theme-light")

    return (
        <section className="home-page">
            <div className="content">
                <h1>Welcome to Mister Toy!</h1>
                <p>Explore the best toys and games for every age.</p>
                {/* <button>
                    <NavLink to="/toy" className="hover:underline">Shop Now</NavLink>
                </button> */}
                <NavLink >
                    <ThemeSwitcher setActiveTheme={setActiveTheme} />
                </NavLink>
            </div>
            <img src={homePageImage} alt="Mister Toy" />
        </section>
    )
}