import { Link } from "react-router-dom"
import defaultToyImg from '../assets/img/dog-doll.jpg'
import img from '../assets/img/toys/camera.jpg'

export function ToyPreview({ toy }) {

    function getImgSrc(toyName) {
        const BASE_URL = process.env.NODE_ENV === 'production'
            ? 'public/'
            : 'src/assets/img/toys/'
        return BASE_URL + toyName
    }

    const imgUrl = getImgSrc(toy.imgUrl)
    console.log('toy.imgUrl', toy.imgUrl)
    
    return (
        <article>
            <img src={imgUrl} alt={`Toy: ${toy.name}`} />

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