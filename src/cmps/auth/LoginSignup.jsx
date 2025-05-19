import { Outlet, NavLink } from 'react-router-dom'

export function LoginSignup() {
    return (
        <div className="login-page">
            <Outlet />
        </div>
    )
}
