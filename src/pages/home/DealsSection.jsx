import React from 'react'
import dealsImg from '../../assets/deals.png'

const DealsSection = () => {
    return (
        <section className='section__container deals__container'>
            <div className='deals__image'>
                <img src={dealsImg} alt='' />
            </div>

            <div className='deals__content'>
                <h5>Get Upto 20% Discount</h5>
                <h4>Deals od this month</h4>
                <p>From everyday essentials to top-rated picks — all at unbeatable prices.
                    New offers drop daily, so there's always something fresh to grab.
                    Hurry, these limited-time deals won’t last long — once they’re gone, they’re gone!
                    Start saving now and shop smart.
                    No coupons, no codes — just straight-up savings.
                    Your favorite brands, your favorite prices — all in one place.
                    Don’t wait — the clock’s ticking and so is the stock!</p>
                <div className='deals__countdown flex-wrap'>
                    <div className='deals__countdown__card'>
                        <h4>14</h4>
                        <p>Days</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>20</h4>
                        <p>Hours</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>30</h4>
                        <p>Mins</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>05</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DealsSection
