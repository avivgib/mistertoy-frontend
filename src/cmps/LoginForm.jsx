import { useState } from 'react'
import { userService } from '../services/user.service.js'

export function LoginForm({ onLogin }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignup, setIsSignup] = useState(true)  // Default to signup
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prevCreds => ({ ...prevCreds, [name]: value }))
        setErrorMsg('')
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        setIsLoading(true)
        
        const authMethod = isSignup ? userService.signup(credentials) : userService.login(credentials)

        authMethod
            .then(user => {
                if (onLogin) onLogin(user)
            })
            .catch(err => {
                console.error('Authentication failed:', err)
                setErrorMsg(typeof err === 'string' ? err : 'Authentication failed')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function toggleSignup() {
        setIsSignup(prevState => !prevState)
        setCredentials(userService.getEmptyCredentials()) // Clear credentials when switching modes
        setErrorMsg('') // Clear error message when switching
    }

    return (
        <section className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>{isSignup ? 'Create Account' : 'Sign In'}</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {isSignup && (
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={credentials.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {errorMsg && <p className="error">{errorMsg}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? (isSignup ? 'Signing up...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Sign In')}
                </button>

                <div className="toggle-signup-signin">
                    {/* Toggle between signup and signin */}
                    <button type="button" onClick={toggleSignup}>
                        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                    </button>
                </div>
            </form>
        </section>
    )
}
