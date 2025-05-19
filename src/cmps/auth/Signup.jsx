import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { signup } from '../../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function Signup() {
    const navigate = useNavigate()

    function onSignup(credentials) {
        signup(credentials)
            .then(() => {
                showSuccessMsg('Signed up successfully')
                navigate('/welcome') // After signup
            })
            .catch(() => showErrorMsg('Oops, try again'))
    }

    return <LoginForm onLogin={onSignup} isSignup={true} />
}
