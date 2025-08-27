import React from 'react'
import OrderSummary from './OrderSummary'
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const CartModal = ({ products, isCartOpen, onClose }) => {

    const dispatch = useDispatch();

    const handleQuantity = (type, id) => {
        const payload = { type, id };
        dispatch(updateQuantity(payload));
    }

    const handleRemove = (e, id) => {
        e.preventDefault(); // Prevent default action of the button
        dispatch(removeFromCart({ id }));
        // console.log('Remove item with id:', id);
    }


    return (
        // <div className={`fixed z-[1000] inset-0 bg-black/80  transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        //     style={{ transition: 'opacity 0.3s ease-in-out' }}>
        <div className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* <div className={`fixed right-0 top-0 md:w-1/3 bg-white h-full overflow-y-auto transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ transition: 'transform 0.3s ease-in-out' }}> */}
            <div className={`fixed top-0 right-0 w-full md:w-1/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out will-change-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className='p-4 mt-4'>
                    <div className='flex items-center justify-between  border-b mb-4'>
                        <h3 className='text-xl font-semibold'>Shopping Cart</h3>
                        <button onClick={onClose} className='text-gray-500 hover:text-gray-700 p-1 bg-black'>
                            <i className="ri-close-line"></i>
                        </button>
                    </div>

                    {/* cart details */}
                    <div className='cart-items'>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <div key={index} className='flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4'>
                                    <div className='flex items-center '>
                                        <span className='mr-4 px-2 bg-primary rounded-full text-white'>0{index + 1} </span>
                                        <img src={product.image} alt={product.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                                        <div>
                                            <h5 className='text-lg font-semibold'>{product.name}</h5>
                                            <p className='text-sm text-gray-600'>${Number(product.price).toFixed(2)}</p>
                                        </div>

                                        <div className='flex flex-row md:justify-start justify-end items-center mt-2 '>
                                            <button onClick={() => handleQuantity('decrement', product._id)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8'>-</button>
                                            <span className='px-2 text-center mx-1'>{product.quantity}</span>
                                            <button onClick={() => handleQuantity('increment', product._id)} className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'>+</button>
                                            <div className=' ml-5'>
                                                <button onClick={(e) => handleRemove(e, product._id)} className=' text-white bg-red-600 px-1 rounded-md flex items-center justify-center
                                             mr-4'><i className='ri-delete-bin-7-line'></i></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className='text-center py-4 text-gray-500'>Your cart is empty.</p>
                        )}
                    </div>

                    {/* cart summary /calculation */}
                    {
                        products.length > 0 && (
                            <div className='mt-4'>
                                <OrderSummary products={products} />
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default CartModal
