import { Link } from "react-router-dom"
import defaultToyImg from '../assets/img/dog-doll.jpg'

export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <img src={defaultToyImg} alt={`Toy: ${toy.name}`} />

            <h4>{toy.name}</h4>
            
            <p className="price">${toy.price.toLocaleString()}</p>

            {toy.owner && (
                <p className="owner">
                    Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link>
                </p>
            )}

            <nav className="actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </nav>
        </article>
    )
}