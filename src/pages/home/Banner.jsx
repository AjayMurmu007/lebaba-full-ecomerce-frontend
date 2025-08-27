import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>Up TO 20% DISCOUNT ON</h4>
        <h1>Girl's Fashion</h1>
        <p>
          Discover the latest fashion trends in-store! From everyday style to statement pieces, we’ve got something for everyone. Drop by and find your next favorite look — we can’t wait to see you!
        </p>
        <button className='btn btn-primary'>
          <Link to={"/shop"} className='btn'>
            Shop Now
          </Link>
        </button>
      </div>


      <div className='header__image'>
        <img src={bannerImg} alt="banner" />
      </div>

    </div>
  )
}

export default Banner
