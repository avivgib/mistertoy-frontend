import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    if (!toys || !toys.length) return <p>No toys to show</p>

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                </li>
            )}
        </ul>
    )
}
