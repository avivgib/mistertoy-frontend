import { Link } from "react-router-dom"
import defaultToyImg from '../assets/img/dog-doll.jpg'
import img from '../assets/img/toys/camera.jpg'

export function ToyPreview({ toy, onRemoveToy }) {
    // console.log('toy', toy)
    function getImgSrc(toyName) {
        const BASE_URL = process.env.NODE_ENV === 'production'
            ? 'public/'
            : 'src/assets/img/toys/'
        return BASE_URL + toyName
    }

    const imgUrl = getImgSrc(toy.imgUrl)
    // console.log('toy.imgUrl', toy.imgUrl)

    return (
        <article>
            <div className="card-content">
                <div>
                    <button onClick={() => onRemoveToy(toy._id)}
                        className="remove-btn"
                        title="Remove toy"
                    >🗑️</button>
                </div>
                
                <img src={imgUrl} alt={`Toy: ${toy.name}`} />

                <h4>{toy.name}</h4>

                <p className="price">${toy.price.toLocaleString()}</p>
                <p className="date">
                    {new Date(toy.createdAt).toLocaleDateString('he-IL')}
                </p>
                {toy.owner && (
                    <p className="owner">
                        Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link>
                    </p>
                )}

                <nav className="actions">
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                </nav>
            </div>
        </article>
    )
}