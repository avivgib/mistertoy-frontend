// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'
// import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { useEffect } from 'react'

export function ToyIndex() {

    // const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    // const isOnline = useOnlineStatus()

    // useEffect(() => {
    //     console.log(`status: ${isOnline ? 'online' : 'offline'}`)
    // }, [isOnline])

    useEffectOnUpdate(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        console.log(toyToSave)

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    return (
        <div>
            <main className='toy-index'>
                <aside className='sidebar'>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                </aside>

                <section className='main-content'>
                    {!isLoading
                        ? <ToyList
                            toys={toys}
                            onRemoveToy={onRemoveToy}
                        />
                        : <div>Loading...</div>
                    }
                    <hr />
                    <button> <Link to="/toy/edit">Add Toy</Link></button>
                    <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
                </section>
            </main>
        </div>
    )
}