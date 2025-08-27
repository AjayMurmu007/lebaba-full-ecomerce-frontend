import React from 'react'
import instaImgs1 from '../assets/instagram-1.jpg'
import instaImgs2 from '../assets/instagram-2.jpg'
import instaImgs3 from '../assets/instagram-3.jpg'
import instaImgs4 from '../assets/instagram-4.jpg'
import instaImgs5 from '../assets/instagram-5.jpg'
import instaImgs6 from '../assets/instagram-6.jpg'



const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className='ri-map-pin-2-fill'></i></span>
                123, LOndon Street, London
            </p>
            <p>
                <span><i className='ri-mail-fill'></i></span>
                support@gmail.com
            </p>
            <p>
                <span><i className='ri-phone-fill'></i></span>
                (+091) 4578135
            </p>
        </div>

        <div className='footer__col'>
            <h4>COMPANY</h4>
            <a href='/'> Home </a>
            <a href=''> About Us </a>
            <a href=''> Work With Us </a>
            <a href=''> Our Blogs </a>
            <a href=''> Terms and Conditions </a>
        </div>

        <div className='footer__col'>
            <h4> USEFIL LINKS</h4>
            <a href=''> Help </a>
            <a href=''> Track your Order </a>
            <a href=''> Men </a>
            <a href=''> Women </a>
            <a href=''> Dresses </a>
        </div>

        <div className='footer__col'>
            <h4>INSTAGRAM</h4>
            <div className='instagram__grid'>
                <img src={instaImgs1} alt='' />
                <img src={instaImgs2} alt='' />
                <img src={instaImgs3} alt='' />
                <img src={instaImgs4} alt='' />
                <img src={instaImgs5} alt='' />
                <img src={instaImgs6} alt='' />
            </div>
        </div>

    </footer>

    <div className='footer__bar'>
        Copyright @ 2025 By AJAY. All Rights Reserved.
    </div>
      
    </>
  )
}

export default Footer
