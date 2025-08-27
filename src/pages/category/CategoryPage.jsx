import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';

// import products from '../../data/products.json'

const CategoryPage = () => {

  const { categoryName } = useParams();

  // before backend
  // const [filteredProducts, setfilteredProducts] = useState([]);

  // useEffect(() => {
  //   const filtered = products.filter((product) => product.category === categoryName.
  //     toLowerCase());
  //   setfilteredProducts(filtered);
  // }, [categoryName])
  //////

  // Use the API to fetch products by category
  const {
    data: response,
    isLoading,
    isError,
  } = useFetchAllProductsQuery({ category: categoryName });

  const product = response?.products || [];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'> {categoryName} </h2>
        <p className='section__subheader'>Browse a diverse range of categories, from lifestyle and tech to how-to guides and product reviews.
          Whatever you’re curious about, we’ve got something for you.</p>
      </section>

      {/* product cards */}
      {/* <div className='section__container'> */}
      {/* <ProductCards products={filteredProducts} /> */}
      {/* <ProductCards products={product} />
      </div> */}

      <div className='section__container'>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to fetch products.</p>
        ) : product.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <ProductCards products={product} />
        )}
      </div>
    </>
  )
}

export default CategoryPage
