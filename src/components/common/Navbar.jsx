import React, { useContext, useEffect, useState } from 'react'
import { BsCaretDownFill, BsSearch } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { HiShoppingBag } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import "../../style/Navbar.scss"
import { AiOutlineBars } from 'react-icons/ai'
import { CategoryContext } from '../../context/categoryContext'
import { BasketContext } from '../../context/basketContext'
import 'react-toastify/ReactToastify.css'
import { AuthContext } from '../../context/authContext'
import { toast, ToastContainer } from 'react-toastify'

const Navbar = () => {
  const { categories } = useContext(CategoryContext)
  const [showCategory, setShowCategory] = useState(false);
  const {getBasketTotal, itemsCount, totalAmount, dispatch: basketDispatch, basket} = useContext(BasketContext)
  const [searchTerm, setSearchTerm] = useState('');
  const { authData, logout, dispatch: authDispatch } = useContext(AuthContext);

  console.log(categories)
  const toggleCategory = () => {
    setShowCategory(prevData => !prevData );
  }

  const notify = () => toast("You are logged out!")

  const handleSearchItemm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    getBasketTotal(basketDispatch);
  }, [basket])

  return (
    <nav className='navbar'>
      <div className='navbar-top bg-secondary flex align-center'>
        <div className='container w-100 flex align-center justify-end'>
          {
            authData.isLoggedIn ?
            <Link to="/account" className='flex mx-4 align-center justify-end text-dark mx-4'>
              <FaUser size={14} />
              <span className='mx-2 fs-13 text-uppercase ls-1'>{authData.info.firstName}</span>
            </Link>
            :
            <Link to="/login" className='mx-4 login-btn flex align-center justify-end text-dark'>
              <FaUser size={14} />
              <span className='mx-2 fs-13 text-uppercase ls-1'>Login</span>
            </Link>
          }

          <button type='button' className='flex align-center justify-end text-dark' onClick={() => logout(authDispatch)}>
            <FiLogOut size={14} /> 
            <span className='mx-2 fs-13 text-uppercase ls-1' onClick={notify}>Logout</span>
          </button>
        </div>
      </div>

      <div className='navbar-main bg-primary'>
        <div className='container'>
          <div className='navbar-main-top flex align-center justify-between'>
            <Link to="/" className='navbar-brand'>
              <span className='text-yellow fs-26 fw-26'>Black</span>
              <span className='text-white fs-26 fw-26'>Friday</span>
            </Link>

            <form className='navbar-search-form'>
              <div className='input-group bg-white'>
                <input type='text' placeholder='Search for Product, Band or Category' className='form-control' onChange={e => handleSearchItemm(e)}/>
                <Link to={`search/${searchTerm}`} className='btn btn-primary flex align-center text-white px-3'>
                  <BsSearch size={15}/>
                  <span className='fs-15 mx-2'>Search</span>
                </Link>
              </div>
            </form>

            <div className='navbar-basket text-white flex align-center'>
              <Link to='/basket' className='basket-btn'>
                <HiShoppingBag size={29} />
                <span className='basket-count flex align-center justify-center'>{itemsCount}</span>
              </Link>
              <div className='text-end basket-count'>
                <p className='text-uppercase fs-14'>my cart</p>
                <Link to='/basket' className='fw-7'>$&nbsp;
                  <span className='basket-amount'>{totalAmount}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className='navbar-main-bottom flex align-center justify-between'>
            <div className='navbar-cats-wrapper'>
              <div className='navbar-cats-btn flex align-center text-white px-2 py-2' onClick={toggleCategory}>
                <AiOutlineBars />
                <span className='text-uppercase mx-3 fs-13'>all categories</span>
                <BsCaretDownFill />
              </div>

              <ul className={`category-list ${showCategory ? 'show-category-list' : ''}`}  onClick={toggleCategory}>
                {
                  categories.map((category, id) => {
                    return (
                      <li key={id} className='category-item' >
                        <Link to={`category/${category.slug}`} className='category-item-link text-uppercase text-dark fs-12'>{category.name?.replace("-", "")}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <ul className='navbar-nav flex align-center'>
                {
                  categories.slice(0, 6).map((category, id) => {
                    return (
                      <li key={id} className='nav-item' >
                        <Link to={`category/${category.slug}`} className='nav-link no-wrap'>{category.name?.replace("-", "")}</Link>
                      </li>
                    )
                  })
                }
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />
    </nav>
  )
}

export default Navbar
