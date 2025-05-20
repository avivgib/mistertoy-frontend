import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { signup } from '../../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function Signup() {
    const navigate = useNavigate()

    async function onSignup(credentials) {
        try {
            await signup(credentials)
            showSuccessMsg('Signed up successfully')
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Oops, try again', err)
            throw err   
        }
    }

    return <LoginForm onLogin={onSignup} isSignup={true} />
}
