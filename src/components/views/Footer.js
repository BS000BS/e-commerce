import React from 'react'

function Footer() {
    return (
        <div style={{ background: '#9AB9D0', bottom: '0px', width: '100%', height: '200px', marginTop: '70px' }} className='d-flex justify-content-evenly align-items-center'>
            <div className='px-2' style={{ maxWidth: '50vw' }}>BS-Store, the online store you want.</div>
            <div className='flex-column justify-content-center align-items-center text-center px-2'>
                <p>Find us on social media:</p>
                <i className="bi bi-instagram me-3" style={{ color: '#AD1457', cursor: 'pointer' }}></i>
                <i className="bi bi-facebook text-primary" style={{ cursor: 'pointer' }}></i>
            </div>
        </div>
    )
}

export default Footer