import React, { useState } from 'react'

const SearchForm = ({searchText}) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        searchText(text)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="inputSearch"
                    placeholder="e.g politics"
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="buttonSearch">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm
