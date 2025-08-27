import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products, highlight = '' }) => {
  // console.log('Products:', products);

  const dispatch = useDispatch();

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <mark key={i}>{part}</mark> : part
    );
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // console.log('Add to cart:', product);
  }



  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {
        products.map((product) => (
          <div key={product._id} className='product__card'>
            <div className='relative'>
              <Link to={`/shop/${product._id}`}>
                <img src={product.image} alt={product.name} className='max-h-96 w-full md:h-64 object-cover mb-4 rounded-lg hover:scale-105 transition-all duration-300' />
              </Link>

              {/* add to cart btn */}
              <div className='absolute top-4 right-4 hover:block'>
                <button onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}>
                  <i className='ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark' />
                </button>
              </div>
            </div>

            {/* product description */}
            <div className='product__card__content'>
              <h4> {highlightText(product.name, highlight)} </h4>
              <p>${product.price} {product?.oldPrice ? <s>${product?.oldPrice}</s> : null} </p>

              <RatingStars rating={product.rating} />
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default ProductCards
