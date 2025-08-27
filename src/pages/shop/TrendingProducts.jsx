import React, { useState } from 'react'
import ProductCards from './ProductCards'
// import products from '../../data/products.json'
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';

const TrendingProducts = () => {

  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 4);
  }

  // const { data, error, isLoading } = useFetchAllProductsQuery({});
  // const products = data?.products || [];
  // or
  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});

  // console.log("Loading:", isLoading);
  // console.log("Error:", error);
  // console.log("products:", products);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products..</p>;


  return (
    <section className='section__container products__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader mb-12'>
        Discover the latest trends in fashion and accessories. Our trending products are handpicked to keep you stylish and up-to-date with the latest fashion.</p>

      {/* products cards */}
      <div className='mt-12'>
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* LOad more Product */}
      <div className='product__btn'>
        {
          visibleProducts < products.length && (
            <button onClick={loadMoreProducts} className='btn'>
              Load More
            </button>
          )
        }
      </div>


    </section>
  )
}

export default TrendingProducts
