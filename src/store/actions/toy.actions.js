import { toyService } from "../../services/toy.service.js"
import { showSuccessMsg } from "../../services/event-bus.service.js"
import { 
        SET_TOYS, 
        ADD_TOY, 
        REMOVE_TOY, 
        UPDATE_TOY, 
        TOY_UNDO, 
        SET_FILTER_BY, 
        SET_IS_LOADING, 
        ADD_MSG_TO_TOY 
    } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService
        .remove(toyId).then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })

    return toyService.remove(toyId)
        .then(() => {
            showSuccessMsg('Removed Toy!')
        })
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    console.log('type:', type)
    console.log('toy:', toy)

    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy:', savedToy)
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export async function loadToyById(toyId) {
    try {
        const toy = await toyService.getById(toyId)
        store.dispatch({ type: UPDATE_TOY, toy})
        return toy
    } catch (err) {
        console.log('toy action -> Cannot load toy by id', err)
        throw err
    }
}

export async function addMsgToToy(toyId, msg) {
    const state = store.getState()
    const toy = state.toyModule.toys.find(t => t._id === toyId)

    if (!toy) throw new Error('Toy not found')

    const updatedToy = {
        ...toy,
        msgs: [...(toy.msgs || []), msg]
    }

    try {
        const savedToy = await toyService.save(updatedToy)
        store.dispatch({ type: ADD_MSG_TO_TOY, toyId, msg })
        return savedToy
    } catch(err) {
        console.log('toy action -> Cannot add message to toy', err)
        throw err
    }
}