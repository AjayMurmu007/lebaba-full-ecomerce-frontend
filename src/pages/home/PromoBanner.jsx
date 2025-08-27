import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
      <div className='banner__card'>
        <span><i className='ri-truck-line'></i></span>
        <h4>Free Delivery </h4>
        <p>Free delivery available for a limited time — don’t miss out!</p>
      </div>
      
      <div className='banner__card'>
        <span><i className='ri-money-dollar-circle-line'></i></span>
        <h4>100% Money Back Guarantee </h4>
        <p>If you're not happy with your purchase, we'll refund your money.
No questions asked, no hassle, no risk.</p>
      </div>

      <div className='banner__card'>
        <span><i className='ri-user-voice-fill'></i></span>
        <h4>Strong Support </h4>
        <p>Our dedicated support team is just a message or call away—ready to solve your issues quickly and efficiently.</p>
      </div>

    </section>
  )
}

export default PromoBanner
