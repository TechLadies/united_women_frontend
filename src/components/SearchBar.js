import React, { useState } from 'react';

const SearchBar = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = e => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Submitted');
        console.log(inputs);
      };
    
    return (
        <div>
            <form className='form-inline' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input className="form-control mr-sm-2" 
                    type="text" 
                    name="search"
                    value={inputs.search}
                    onChange={handleChange}
                    placeholder="Search" 
                    aria-label="Search" 
                    style={{background:'#f4f4f4'}}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        </div>
    )
};

export default SearchBar;