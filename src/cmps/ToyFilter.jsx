import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

const TOY_LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const SORT_OPTIONS = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'createdAt', label: 'Created' }
]

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 1000))

    // useEffectOnUpdate(() => {
    //     debouncedSetFilter.current(filterByToEdit)
    // }, [filterByToEdit])

    useEffect(() => {
        debouncedSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleStockChange({ target }) {
        const value = target.value
        setFilterByToEdit(prev => ({
            ...prev,
            inStock: value === 'all' ? undefined : value === 'true'
        }))
    }
    
    // console.log('filterByToEdit', filterByToEdit.labels)
    function handleLabelCheckboxChange({ target }) {
        const { value, checked } = target
        
        setFilterByToEdit(prev => {
            const labels = prev.labels || []
            let newLabels
            
            checked ? newLabels = [...labels, value]
            : newLabels = labels.filter(label => label !== value)
            
            return { ...prev, labels: newLabels }
        })
    }

    return (
        <section className="toy-filter full main-layout">
            <h2 className="filter-title">Filters</h2>
            <form className="filter-form">

                <div className="filter-row stock-row">
                    {/* Filter by name */}
                    <div className="filter-group">
                        <label htmlFor="name" className="filter-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="txt"
                            className="filter-input"
                            placeholder="Toy Name"
                            value={filterByToEdit.txt || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Multiselect for labels */}
                    <div className="filter-group">
                        <label className="filter-label">Labels:</label>
                        <div className="checkbox-list">
                            {TOY_LABELS.map(label => (
                                <label key={label} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        value={label}
                                        checked={filterByToEdit.labels?.includes(label)}
                                        onChange={handleLabelCheckboxChange}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
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
                            <option value="">-- Sort By --</option>
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="filter-row">
                    {/* In stock: toggle between true / false / undefined */}
                    <div className="filter-group">
                        <label className="filter-label">Stock Status:</label>
                        <div className="radio-list">
                            <label htmlFor="stock">
                                <input
                                    type="radio"
                                    id="stock"
                                    name="stock"
                                    value="all"
                                    checked={filterByToEdit.inStock === undefined}
                                    onChange={handleStockChange}
                                />
                                All
                            </label>
                            <label htmlFor="inStock">
                                <input
                                    type="radio"
                                    id="inStock"
                                    name="inStock"
                                    value="true"
                                    checked={filterByToEdit.inStock === true}
                                    onChange={handleStockChange}
                                />
                                In Stock
                            </label>
                            <label htmlFor="outOfStock">
                                <input
                                    type="radio"
                                    id="outOfStock"
                                    name="outOfStock"
                                    value="false"
                                    checked={filterByToEdit.inStock === false}
                                    onChange={handleStockChange}
                                />
                                Out of Stock
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}