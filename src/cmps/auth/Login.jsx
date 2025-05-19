import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { login } from '../../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function Login() {
    const navigate = useNavigate()

    function onLogin(credentials) {
        login(credentials)
            .then(() => {
                showSuccessMsg('Logged in successfully')
                navigate('/toy') // Redirect to home or wherever
            })
            .catch(() => showErrorMsg('Oops, try again'))
    }

    return <LoginForm onLogin={onLogin} isSignup={false} />
}
