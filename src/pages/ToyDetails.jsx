import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { ToyChat } from '../cmps/ToyChat.jsx'
import { loadToyById } from '../store/actions/toy.actions.js'

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const toy = useSelector(storeState =>
        storeState.toyModule.toys.find(toy => toy._id === toyId)
    )

    useEffect(() => {
        if (!toyId) return
        if (!toy) {
            // setIsLoading(true)
            loadToyById(toyId)
                .catch(err => {
                    console.log('Had issues in toy details', err)
                    navigate('/toy')
                })
        }
    }, [toyId, toy, navigate])

    if (isLoading) return <div>Loading...</div>
    if (!toy) return <div>Toy not found</div>

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

            <ToyChat toyId={toy._id} />
        </section>
    )
}
