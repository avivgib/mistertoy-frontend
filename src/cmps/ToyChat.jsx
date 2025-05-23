import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addMsgToToy } from '../store/actions/toy.actions.js'
import { socketService, SOCKET_EVENT_ADD_MSG, SOCKET_EVENT_SEND_MSG } from '../services/socket.service.js'

export function ToyChat({ toyId }) {
    const [newMsg, setNewMsg] = useState('')
    const messagesEndRef = useRef(null)

    const toy = useSelector(storeState =>
        storeState.toyModule.toys.find(toy => toy._id === toyId)
    )

    const messages = toy?.msgs || []

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    useEffect(() => {
        socketService.setup()

        socketService.on(SOCKET_EVENT_ADD_MSG, msg => {
            console.log('New message from server:', msg)
            if (msg.toyId === toyId) {
                addMsgToToy(toyId, msg)
            }
        })

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG)
            socketService.terminate()
        }
    }, [toyId])

    function handleSendMessage() {
        if (!newMsg.trim()) return

        const msgToAdd = {
            text: newMsg,
            from: 'user',
            at: Date.now(),
            toyId,
        }

        // שולח הודעה לשרת דרך סוקט
        socketService.emit(SOCKET_EVENT_SEND_MSG, msgToAdd)

        // שומר גם ל־store (אם אתה רוצה שהלקוח יראה מיד)
        addMsgToToy(toyId, msgToAdd)
            .then(() => setNewMsg(''))
            .catch(err => console.error('Cannot add message', err))
    }

    return (
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
    )
}
