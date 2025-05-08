import 'animate.css'
import { useState, useEffect, useRef } from 'react'
import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const [animation, setAnimation] = useState('animate__bounce')
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setAnimation('animate__fadeInDown')
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setAnimation('animate__fadeOutUp')
        setTimeout(() => setMsg(null), 1000)
    }

    if (!msg) return <span></span>

    return (
        <section className={`user-msg ${msg.type} ${animation} animate__animated`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
