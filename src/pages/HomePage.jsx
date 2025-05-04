import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import videoFile from '../assets/video/mister-toy-home-page3.mp4'

// import { CHANGE_BY } from "../store/reducers/user.reducer.js"

import homePageImage from '../assets/img/mister-toy-home-page.png'

export function HomePage() {
    const [activeTheme, setActiveTheme] = useState("theme-light")

    return (
        <section className="home-page">
            <div className="video-wrapper">
                <video className="bg-video" autoPlay loop muted playsInline>
                    <source src={videoFile} type="video/mp4" />
                </video>
                <div className="overlay" />
                <div className="hero-content">
                    <h1>Welcome to Mister Toy!</h1>
                    <p>Find the perfect toy for every kid, every age.</p>
                    <NavLink to="/toy" className="btn-shop">Shop Now</NavLink>
                </div>
            </div>

            <section className="features">
                <h2>Why shop with us?</h2>
                <ul className="features-list">
                    <li>🎁 Unique toys for all ages</li>
                    <li>🚚 Free shipping over $50</li>
                    <li>🧸 Safe & high quality</li>
                </ul>
            </section>
        </section>
    )
}