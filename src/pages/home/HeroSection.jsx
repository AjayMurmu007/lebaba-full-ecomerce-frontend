import React from 'react'
import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'


const HeroSection = () => {

    const  cards = [
        {
            id: 1,
            title: 'Womens Shirt',
            trend: '2022 trend',
            description: 'This is the first card.',
            image: card1,
        },
        {
            id: 2,
            title: 'Womens Dresses',
            trend: '2022 trend',
            description: 'This is the first card.',
            image: card2,
        },
        {
            id: 3,
            title: 'Womens Casual',
            trend: '2022 trend',
            description: 'This is the first card.',
            image: card3,
        }
    ];


  return (
    <div className='section__container hero__container'>
      { cards.map((card) => (
        <div key={card.id} className='hero__card'>
          <img src={card.image} alt={card.title} className='hero__card-image' />
          <div className='hero__content'>
            <p className=''>{card.trend}</p>
            <h4 className=''>{card.title}</h4>
            <a href='#' className='hero__card-link'>Discover more</a>
          </div>
        </div>
      ))}

    </div>
  )
}

export default HeroSection
