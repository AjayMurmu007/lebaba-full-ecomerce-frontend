import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal';
import avatarImage from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

  const products = useSelector((state) => state.cart.products);
  // console.log(products);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

  // show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);    //authreducer se a rh hai
  // console.log("user:", user );
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();


  // DROPDOWN MENU
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  // Admin DropDown Menu
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Product", path: "/dashboard/add-product" },
  ]

  //
  // USER DropDown Menu
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ]

  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert('Logout successful');
      navigate('/');
    } catch (error) {
      console.error("Failed to logout", error)
    }
  }

  const dropdownRef = useRef(null);

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  return (
    <header className='fixed-nav-bar w-nav'>
      <nav className='max-w-screen-2xl mx-auto flex items-center justify-between px-4'>
        <ul className='nav__links'>
          <li className='link'><Link to={"/"}>Home</Link></li>
          <li className='link'><Link to={"/shop"}>Shop</Link></li>
          {/* <li className='link'><Link to={"#"}>Pages</Link></li> */}
          <li className='link'><Link to={"/contact-us"}>Contact us</Link></li>
        </ul>

        {/* logo */}
        <div className='nav__logo'>
          <Link to={"/"}>
            Shopping <span>.</span>
          </Link>
        </div>

        {/* nav icons */}
        <div className='nav__icons relative'>
          {/* Search */}
          <span>
            <Link to={"/search"}>
              <i className="ri-search-line"></i>
            </Link>
          </span>

          {/* Cart */}
          <span>
            <button onClick={handleCartToggle} className='hover:text-primary'>
              <i className="ri-shopping-bag-line"></i>
              <sup className='text-sm inline-block px-1.5  text-white rounded-full bg-primary text-center'> {products.length} </sup>
            </button>
          </span>
          <span>

            {/* User */}
            <div className="relative" ref={dropdownRef}>
              {
                user && user ? (<>
                  <img onClick={handleDropDownToggle} src={user?.profileImage || avatarImage} alt='' className='size-8 rounded-full object-cover cursor-pointer border border-gray-300' />

                  {
                    isDropDownOpen && (
                      <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                        <ul className='font-medium space-y-4 p-2 text-sm sm:text-base'>
                          {dropDownMenus.map((menu, index) => (
                            <li key={index}>
                              <Link to={menu.path} className='dropdowns-items' onClick={() => setIsDropDownOpen()}> {menu.label} </Link>
                            </li>
                          ))}
                          {/* <li className='dropdowns-items font-medium' onClick={handleLogout}>Logout</li> */}
                          <li>
                            <button className='block  w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md' onClick={handleLogout}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )
                  }

                </>) :

                  <Link to={"/login"}>
                    <i className="ri-user-line"></i>
                  </Link>
              }
            </div>

          </span>
        </div>

      </nav>

      {/* cart sidebar */}
      {/* {isCartOpen && (
        <div className='cart__sidebar'>
          <div className='cart__sidebar__header'>
            <h3>Shopping Cart</h3>
            <button onClick={handleCartToggle} className='close__btn'>
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className='cart__sidebar__content'>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className='cart__item'>
                  <img src={product.image} alt={product.name} />
                  <div className='cart__item__details'>
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      )} */}


      {/* Cart Sidebar */}
      {
        isCartOpen &&
        <CartModal products={products} isCartOpen={isCartOpen} onClose={handleCartToggle} />

      }

    </header>
  )
}

export default Navbar
