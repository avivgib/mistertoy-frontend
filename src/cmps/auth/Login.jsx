import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { login } from '../../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            dispatch({ type: 'SET_USER', user })
            showSuccessMsg('Logged in successfully')
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Oops, try again')
            throw err
        }
    }

    return <LoginForm onLogin={onLogin} isSignup={false} />
}
