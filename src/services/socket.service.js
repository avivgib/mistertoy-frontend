import { io } from 'socket.io-client'

export const SOCKET_EVENT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'

export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'

export const SOCKET_EVENT_USER_UPDATED = 'user-updated'

const baseUrl = (process.env.NODE_ENV === 'production')
    ? ''
    : 'http://localhost:3030'

export const socketService = createSocketService()

function createSocketService() {
    var socket = null

    return {
        setup,
        on,
        off,
        emit,
        terminate,
    }

    function setup() {
        socket = io(baseUrl)

        socket.on('connect', () => {
            console.log('Socket connected', socket.id)
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected')
        })
    }

    function terminate() {
        if (socket) {
            socket.disconnect()
            socket = null
        }
    }

    function on(eventName, cb) {
        if (!socket) {
            console.warn('Socket not initialized yet')
            return
        }
        socket.on(eventName, cb)
    }

    function off(eventName, cb = null) {
        if (!socket) return
        if (!cb) socket.removeAllListeners(eventName)
        else socket.off(eventName, cb)
    }

    function emit(eventName, data) {
        if (!socket) return
        socket.emit(eventName, data)
    }
}
