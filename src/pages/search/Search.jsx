import React, { useEffect, useState } from 'react'
// import productsData from '../../data/products.json' 
import ProductCards from '../shop/ProductCards'
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';
import useDebounce from '../../hooks/useDebounce';
// import SkeletonCard from '../../loader/SkeletonCard ';
import LoadingDots from '../../loader/LoadingDots';


const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounced hook query

    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});
    // console.log("products :", products);

    // Load products initially
    useEffect(() => {
        // Show all products by default
        if (products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);


    // Load search history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save search history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    // Filter products when debounced search query changes
    useEffect(() => {
        const query = debouncedSearchQuery.toLowerCase().trim();

        if (!query) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );

            setFilteredProducts(filtered);
        }
    }, [debouncedSearchQuery, products]);
    /////



    // Search button or Enter key handler
    const handleSearch = () => {
        const query = searchQuery.toLowerCase().trim();

        // const filtered = productsData.filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

        if (!query) {
            // If search is empty, reset to all products
            setFilteredProducts(products);
            return;
        }

        // Update search history
        setSearchHistory(prev => {
            const filtered = prev.filter(item => item !== query);
            return [query, ...filtered].slice(0, 5);
        });

        const filtered = products.filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

        setFilteredProducts(filtered);
    }

    // Render loading state
    // if (isLoading) return <p>Loading products...</p>;
    if (isLoading) {
        return (
            // <section className='section__container flex flex-wrap gap-4'>
            //     {Array.from({ length: 8 }).map((_, i) => <LoadingDots key={i} />)}
            // </section>
            <section className='section__container h-60 flex items-center justify-center'>
                <LoadingDots />
            </section>
        );
    }

    if (error) return <p>Error loading products: {error.error}</p>;


    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'> Search Products </h2>
                <p className='section__subheader'>Browse a diverse range of categories, from lifestyle and tech to how-to guides and product reviews.Whatever you’re curious about, we’ve got something for you.</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4' style={{ marginBottom: '40px' }} >
                    <input type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        placeholder='Search for products....'
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        style={{ padding: '2px 2px' }}
                    />

                    <button onClick={handleSearch} className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded' style={{ padding: '2px 8px' }}>
                        Search
                    </button>
                </div>


                {/* Recent Searches UI */}
                {searchHistory.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-6 bg-gray-100 p-3 rounded shadow-sm">
                        <p className="font-semibold mb-2">Recent Searches:</p>
                        <div className="flex flex-wrap gap-2">
                            {searchHistory.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSearchQuery(item)}
                                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}


                {/* productcard */}
                {
                    filteredProducts.length > 0 ? (
                        <ProductCards products={filteredProducts} highlight={debouncedSearchQuery} />
                    ) : (
                        <div className="h-60 flex flex-col items-center justify-center w-full text-center">
                            <div className="text-6xl animate-bounce mb-4">😔</div>
                            <p className="text-gray-500 text-lg font-medium">No Products Found..!!</p>
                        </div>
                    )
                }


            </section>


        </>
    )
}

export default Search
