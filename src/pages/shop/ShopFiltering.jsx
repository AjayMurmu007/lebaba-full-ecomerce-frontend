import React from 'react'

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-8 flex-shrink-0'>
      <h3 className='font-semibold mb-14'>Filters</h3>

      {/* categories */}
      <div className='flex flex-col space-y-2 '>
        <h4 className='font-medium text-lg'>Category</h4>
        <hr />

        {
          filters.categories.map((category) => (

            <label key={category} className='capitalize flex items-center gap-2 mb-2 cursor-pointer'>
              <input
                type='radio'
                name='category'
                id='category'
                value={category}
                checked={filtersState.category === category}
                onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
              />
              <span className='ml-1'> {category} </span>
            </label>

          ))
        }

      </div>

      {/* colors */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Color</h4>
        <hr />

        {
          filters.colors.map((color) => (

            <label key={color} className='capitalize flex items-center gap-2 mb-2 cursor-pointer'>
              <input
                type='radio'
                name='color'
                id='color'
                value={color}
                checked={filtersState.color === color}
                onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
              />
              <span className='ml-1'> {color} </span>
            </label>

          ))
        }

      </div>

      {/* price range */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr />

        {
          filters.priceRanges.map((range) => (

            <label key={range.label} className='capitalize flex items-center gap-2 mb-2 cursor-pointer'>
              <input
                type='radio'
                name='priceRange'
                id='priceRange'
                value={`${range.min}-${range.max}`}
                checked={filtersState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
              />
              <span className='ml-1'> {range.label} </span>
            </label>

          ))
        }

      </div>

      {/* clear filters button */}
      <button
        onClick={clearFilters}
        className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'
      >
        Clear Filters
      </button>
    </div>
  )
}

export default ShopFiltering
