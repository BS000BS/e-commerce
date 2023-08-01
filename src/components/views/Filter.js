import React from 'react'

function Filter({ filter }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      filter(e.target.elements[0].value);
    };

    return (
        <div className='container d-flex justify-content-center m-5'>
            <form onSubmit={(e) => handleSubmit(e)} className="d-flex" style={{width: '40%'}} role="search">
                <input className="form-control me-2" type="search" placeholder="Search ..." aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Filter