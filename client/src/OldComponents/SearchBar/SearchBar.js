import React, { useState } from 'react';

const SearchBar = (props) => {
    const [term, setTerm] = useState("");

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(term);
    };

    return (
        <div className='ui segment'>
            <form onSubmit={onFormSubmit} className='ui form' style={{ marginTop: "10px" }}>
                <div className="field">
                    <label>{props.name} Search</label>
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;