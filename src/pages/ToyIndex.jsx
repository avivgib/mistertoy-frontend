// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

    useEffect(() => {
        console.log('TEST -> 111')
        loadToys()
            .catch(err => {
                console.error('Cannot load toys', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    // useEffectOnUpdate(() => {
    //     loadToys()
    // }, [filterBy])

    function onSetFilter(filterBy) {
        console.log('on set filter')
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

    return (
        <div>
            <main className='toy-index'>
                <aside className='sidebar'>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                </aside>

                <section className='main-content'>
                    <div className="content-grid">
                        <div className="toy-list-wrapper">
                            {!isLoading
                                ? <ToyList
                                    toys={toys}
                                    onRemoveToy={onRemoveToy}
                                />
                                : <div>Loading...</div>
                            }
                        </div>


                        <div className="add-btn-wrapper">
                            <Link to="/toy/edit">
                                <button className='add-btn' >➕</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}