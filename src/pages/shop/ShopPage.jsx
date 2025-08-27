import React, { use, useEffect, useState } from 'react'
import productsData from '../../data/products.json'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';


// HELPER FUNCTION: Pagination with Ellipsis
const getPagination = (currentPage, totalPages) => {
  const delta = 2;  // Kitne pages current page ke left-right show karne hain
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // First page
      i === totalPages || // Last page
      (i >= currentPage - delta && i <= currentPage + delta) // Current page ke aas paas pages
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1); // Beech wala page directly add karo (gap 1 hai)
      } else if (i - l !== 1) {
        rangeWithDots.push('...'); // Dots add karo (gap 2 se zyada hai)
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};



const ShopPage = () => {

  const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'red', 'blue', 'green', 'black', 'white'],
    priceRanges: [
      {
        label: 'Under $50',
        min: 0,
        max: 50,
      },
      {
        label: '$50 - $100',
        min: 50,
        max: 100
      },
      {
        label: '$100 - $200',
        min: 100,
        max: 200
      },
      {
        label: '$200 and Above',
        min: 200,
        max: Infinity
      }
    ]
  }

  // const [products, setProducts] = React.useState(productsData);        // before backend

  const [filtersState, setFiltersState] = React.useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  });

  // BEFORE BACKEND
  // filter function
  // const applyFilters = () => {
  //   let filteredProducts = productsData;

  //   // Filter by category
  //   if (filtersState.category && filtersState.category !== 'all') {
  //     filteredProducts = filteredProducts.filter(product => product.category === filtersState.category);
  //   }

  //   // Filter by color
  //   if (filtersState.color && filtersState.color !== 'all') {
  //     filteredProducts = filteredProducts.filter(product => product.color === filtersState.color);
  //   }

  //   // Filter by price range
  //   if (filtersState.priceRange) {
  //     const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
  //     filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
  //   }

  //   setProducts(filteredProducts);
  // }

  // useEffect(() => {
  //   applyFilters();
  // }, [filtersState]);
  // BEFORE BACKEND

  // AFTER BACKEND
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8); // Products per page

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  })
  // AFTER BACKEND


  // clear filters function
  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    });
    setCurrentPage(1); // Reset page when filters clear
  }

  if (isLoading) return <div>Loading....</div>
  if (error) return <div>Error loading products....</div>

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to top on page change (optional)
    }
  }


  // ** HERE IS THE MAIN CHANGE: GET PAGINATION RANGE WITH DOTS **
  const paginationRange = getPagination(currentPage, totalPages);
  // console.log(paginationRange);



  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'> Shop Page </h2>
        <p className='section__subheader'>Browse a diverse range of categories, from lifestyle and tech to how-to guides and product reviews.
          Whatever you’re curious about, we’ve got something for you.</p>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* left */}
          <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters} />


          {/* right */}
          <div>
            <h3 className='text-xl font-medium mb-4'>
              {/* Product Available : {products.length} */}
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />



            {/* // Pagination Control */}
            {/* <div className='mt-6 flex justify-center'>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>
                Prev
              </button>

              {
                [...Array(totalPages)].map((_, index) => (
                  <button onClick={() => handlePageChange(index + 1)} key={index} className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}> {index + 1} </button>
                ))
              }

              <button
                // disabled={currentPage === totalPages}
                // disabled={currentPage >= totalPages}
                disabled={Number(currentPage) >= Number(totalPages)}
                onClick={() => handlePageChange(currentPage + 1)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>
                Next
              </button>
            </div> */}
            {/* // Pagination Control end here */}


            {/* Pagination Control with Ellipsis */}
            <div className='mt-6 flex justify-center gap-2'>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
              >
                Prev
              </button>

              {paginationRange.map((page, idx) =>
                page === '...' ? (
                  <span key={idx} className='px-4 py-2 text-gray-500 select-none'>
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
              >
                Next
              </button>
            </div>



          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage
