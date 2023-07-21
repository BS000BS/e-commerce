import React from 'react'
import { Link } from 'react-router-dom';

function ProductCard({product}) {

    function shortenString(str) {
      const shortened = str.substring(0, 29)
      return shortened + '...';
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card" style={{minHeight: '420px'}}>
                <img src={product.image} style={{ width: '80%', alignSelf: 'center', height: '280px' }} className="card-img-top pt-3" alt={product.title} title={product.title} />
                <div className="card-body">
                    {product.title.length > 25 ? 
                        <h5 className="card-title">{(product.title.length > 30) ? shortenString(product.title) : product.title}</h5> 
                        : <h5 className="card-title pb-3">{(product.title.length > 25) ? shortenString(product.title) : product.title}</h5>
                    }
                    <Link to={`/product/${product.id}`} className="btn btn-primary">More</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard