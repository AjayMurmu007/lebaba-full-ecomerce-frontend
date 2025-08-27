import React from 'react'
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {

    const { id } = useParams();
    // console.log(id);


    const dispatch = useDispatch();
    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    // console.log(data);


    const singleProduct = data?.product || {};
    // console.log(singleProduct)

    const productReviews = data?.reviews || [];
    // console.log("Reviews:", productReviews);


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <p>Loading....</p>
    if (error) return <p>Error Loading product details..</p>

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'> Single Product Page </h2>
                <div className='section__subheader  space-x-2'>
                    <span className='ml-2 hover:text-primary'> <Link to={'/'}> Home </Link> </span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='ml-2 hover:text-primary'><Link to={'/shop'}> Shop </Link></span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='hover:text-primary'> {singleProduct.name} </span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
                    <div className='w-full md:w-1/2'>
                        <img src={singleProduct?.image} alt='product' className='w-full size-40 h-auto rounded-lg shadow-lg' />
                    </div>
                    <div className='w-full md:w-1/2 space-y-4'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4'>${singleProduct?.price}{singleProduct?.oldPrice && <s className='ml-2'>${singleProduct?.oldPrice}</s>}</p>
                        <p className='text-gray-400 mb-4'> {singleProduct?.description} </p>

                        {/* additional product info */}
                        <div className='flex flex-col space-y-2'>
                            <p> <strong>Category : </strong> {singleProduct?.category} </p>
                            <p> <strong>Color : </strong> {singleProduct?.color} </p>
                            <div className='flex items-center gap-2'>
                                <strong>Rating :</strong>
                                <RatingStars rating={singleProduct?.rating} />
                            </div>
                        </div>

                        <button onClick={(e) => {
                            // e.stopPropagation();
                            handleAddToCart(singleProduct);
                        }} className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'>Add to Cart</button>
                    </div>
                </div>
            </section>

            {/* dislay review */}
            {/* todo work with reveiw when will have an API */}
            <section className='section__container mt-8'>
                <ReviewsCard productReviews={productReviews} />
            </section>
        </>
    )
}

export default SingleProduct
