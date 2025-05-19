import { useSelector } from 'react-redux'

export function Welcome() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    if (!user) return <div>Please login</div>

    return (
        <section className="welcome">
            <h2>Welcome, {user.fullname}!</h2>
            <p>We're glad to have you here.</p>
        </section>
    )
}
