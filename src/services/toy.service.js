import { utilService } from './util.service.js'
import { toyServiceLocal } from './toy.service.local.js'
import { httpService } from './http.service.js'
import defaultToyImg from '../../src/assets/img/dog-doll.jpg'

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    // console.log('filterBy', filterBy)
    return httpService.get(BASE_URL, filterBy)
    // return toyServiceLocal.query(filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
    // return toyServiceLocal.getById(toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
    // return toyServiceLocal.remove(toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
    // return toyServiceLocal.save(toy)
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: '',
        inStock: true,
    }
}

function getRandomToy() {
    const numOfLabels = utilService.getRandomIntInclusive(2, 3)
    const shuffledLabels = utilService.shuffle([...labels])
    const randomLabels = shuffledLabels.slice(0, numOfLabels)

    return {
        // _id: utilService.makeId(),
        name: 'Talking Doll',
        imgUrl: defaultToyImg,
        price: utilService.getRandomIntInclusive(20, 200),
        labels: randomLabels,
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { name: '', labels: [], inStock: undefined, sortBy: '' }
}