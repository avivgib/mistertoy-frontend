import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'

import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { LoginSignup } from './cmps/auth/LoginSignup.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'
import { Login } from './cmps/auth/Login.jsx'
import { Signup } from './cmps/auth/Signup.jsx'

import { store } from './store/store.js'
import { userService } from './services/user.service.js'

const themes = [
    "theme-light",
    "theme-dark",
    "theme-cheerful",
    "theme-pastel",
    "theme-natural"
]

export function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem("preferred-theme") || "theme-light"
        document.documentElement.classList.remove(...themes)
        document.documentElement.classList.add(savedTheme)
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                            <Route path="admin" element={
                                <AuthGuard checkAdmin={true}>
                                    <AdminIndex />
                                </AuthGuard>
                            } />
                            <Route element={<LoginSignup />} path="login" >
                                <Route index element={<Login />} />
                                <Route path="signup" element={<Signup />} />
                            </Route>
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}

function AuthGuard({ children, checkAdmin = false }) {
    // const user = userService.getLoggedinUser()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
    if (isNotAllowed) return <Navigate to="/" />
    return children
}
