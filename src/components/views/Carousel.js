import React from 'react'
import img0 from './images/carousel-img-0.jpeg';
import img1 from './images/carousel-img-1.jpeg';
import img2 from './images/carousel-img-2.jpeg';

function Carousel() {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={{marginBottom: '80px'}}>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img0} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img2} className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel