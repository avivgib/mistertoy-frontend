import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
// import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const hasChanges = useRef(false)
    // useConfirmTabClose(hasChanges)

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        hasChanges.current = true
    }

    function getNonEmptyFields(obj) {
        const result = {}

        for (const key in obj) {
            const val = obj[key]

            const isEmpty =
                val === '' ||
                val === null ||
                val === undefined ||
                (Array.isArray(val) && val.length === 0)

            if (!isEmpty) result[key] = val
        }

        return result
    }

    async function onSaveToy(ev) {
        ev.preventDefault()

        try {
            const cleanedToy = getNonEmptyFields(toyToEdit)
            console.log('Sending toy to save:', cleanedToy)

            await saveToy(cleanedToy)
            showSuccessMsg('Toy Saved')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Could not save toy')
        }


        // const randomToy = toyService.getRandomToy()
        // console.log('Random Toy: ', randomToy)

        // const cleanedToy = getNonEmptyFields(toyToEdit)
        // const mergedToy = { ...randomToy, ...cleanedToy }

        // console.log('Merged Toy: ', mergedToy)

        // saveToy(mergedToy)
        //     .then(() => {
        //         showSuccessMsg('Toy Saved')
        //         navigate('/toy')
        //     })
        //     .catch(err => {
        //         console.log('Had issues in toy details', err)
        //         showErrorMsg('Had issues in toy details')
        //     })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <div>
                    <button type="submit" >{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <button type="button" onClick={() => navigate('/toy')}>Cancel</button>
                </div>
            </form>
        </section>
    )
}