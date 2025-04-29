import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"

const TOY_LABELS = ['Doll', 'Battery Powered', 'Educational', 'Puzzle', 'Outdoor']
const SORT_OPTIONS = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'createdAt', label: 'Created' }
]

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleStockChange() {
        setFilterByToEdit(prev => {
            const nextStockVal =
                prev.inStock === undefined ? true :
                    prev.inStock === true ? false :
                        undefined
            return { ...prev, inStock: nextStockVal }
        })
    }

    function handleLabelChange({ target }) {
        const selected = Array.from(target.selectedOptions, option => option.value)
        setFilterByToEdit(prev => ({ ...prev, labels: selected }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2 className="filter-title">Filters</h2>
            <form className="filter-form">

                <div className="filter-row">
                    {/* Filter by name */}
                    <div className="filter-group">
                        <label htmlFor="name" className="filter-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="txt"
                            className="filter-input"
                            placeholder="By name"
                            value={filterByToEdit.txt || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Multiselect for labels */}
                    <div className="filter-group">
                        <label htmlFor="labels" className="filter-label">Labels:</label>
                        <select
                            id="labels"
                            name="labels"
                            className="filter-select"
                            multiple
                            value={filterByToEdit.labels || []}
                            onChange={handleLabelChange}
                        >
                            {TOY_LABELS.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort dropdown */}
                    <div className="filter-group">
                        <label htmlFor="sortBy" className="filter-label">Sort by:</label>
                        <select
                            id="sortBy"
                            name="sortBy"
                            className='filter-select'
                            value={filterByToEdit.sortBy || ''}
                            onChange={handleChange}
                        >
                            <option value="">-- Select --</option>
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filter-row stock-row">
                    {/* In stock: toggle between true / false / undefined */}
                    <div className="filter-group">
                        <button
                            type="button"
                            className='stock-toggle'
                            onClick={handleStockChange}
                        >
                            {filterByToEdit.inStock === undefined
                                ? 'All'
                                : filterByToEdit.inStock
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}