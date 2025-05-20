// cmps/auth/AuthGuard.jsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AuthGuard({ children, checkAdmin = false }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
    return isNotAllowed ? <Navigate to="/" /> : children
}
