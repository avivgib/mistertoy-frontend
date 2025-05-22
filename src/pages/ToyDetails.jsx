import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [messages, setMessages] = useState([]) // collet from data of current toy ->store
    const [newMsg, setNewMsg] = useState('')
    const { toyId } = useParams()
    const navigate = useNavigate()
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    // Automatic scroll to the bottom of the chat 
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    function handleSendMessage() {
        if (!newMsg.trim()) return
        const msgToAdd = { text: newMsg, from: 'user' }
        setMessages(prev => [...prev, msgToAdd])
        setNewMsg('')
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <div className="toy-info">
                <h1>{toy.name}</h1>
                <h5>Price: ${toy.price}</h5>
                <p>🧸</p>
                <p>Lorem ipsum dolor sit amet...</p>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                <Link to={`/toy`}>Back</Link>
            </div>

            <div className="chat-box">
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.from === 'user' ? 'user' : 'bot'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Write a message..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </section>
    )
}
