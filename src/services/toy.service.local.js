import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import defaultToyImg from '../../src/assets/img/dog-doll.jpg'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyServiceLocal = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.name) filterBy.name = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.name, 'i')
            return toys.filter(toy =>
            {
                console.log(toy.vendor, regExp.test(toy.vendor))
                console.log(toy.price, toy.price <= filterBy.maxPrice)
                return regExp.test(toy.vendor) &&
                toy.price <= filterBy.maxPrice
            })
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        _id: '',
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
        _id: '',
        name: 'Talking Doll',
        imgUrl: defaultToyImg,
        price: utilService.getRandomIntInclusive(20, 200),
        labels: randomLabels,
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { 
        name: '', 
        inStock: undefined,
        labels: [],
        sortBy: 'name' 
    }
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for(var i = 0; i < 12; i++){
        const toy = getRandomToy()
        console.log(toy.labels)
        
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}