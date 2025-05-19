import { httpService } from "./http.service.js"

const BASE_URL = 'auth/'
const USER_URL = 'user/'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

function login({ username, password }) {
    if (!username || !password) {
        return Promise.reject('Username and password are required')
    }

    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            console.log('user FETCH:', user)
            if (user) {
                _setLoggedinUser(user)
                return user
            } 
            return Promise.reject('Invalid username or password')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) {
                _setLoggedinUser(user)
                return user
            }
            else return Promise.reject('Invalid signup')
        })
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
        
}

function updateScore(diff) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('User not logged in')
    if (user.score + diff < 0) return Promise.reject('No credit')

    return httpService.put(USER_URL, { diff })
        .then(user => {
            console.log('updateScore user:', user)
            _setLoggedinUser(user)
            return user.score
        })
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

function getLoggedinUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)
    return user ? JSON.parse(user) : null
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, username: user.username, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



