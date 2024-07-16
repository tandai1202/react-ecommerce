import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../context/productContext'
import "../../style/FilterView.scss"
import { constants } from '../../constants';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { FilterContext } from '../../context/filterContext';

const FilterView = () => {

  const { products } = useContext(ProductContext);
  const { setGridView, setListView, dispatch:filterDispatch, priceSort, loadProducts, sort_by} = useContext(FilterContext);

  useEffect(() => {
    if (products.length > 0) {
      loadProducts(filterDispatch, products);
      priceSort(filterDispatch, sort_by);
    }
  }, [products])

  return (
    <div className='filter-top'>
      <div className='container'>
        <div className='filter-top-content py-3 flex align-center justify-between bg-white px-3'>
          <div className='filter-top-sort flex align-center'>
            <p className='fs-13 text-dark'>Sort By:</p>
            <select className='fs-13 mx-2 filter-select' onChange={e => priceSort(filterDispatch, e.target.value)}>
              <option defaultValue={constants.BEST_MATCH} value={constants.BEST_MATCH}>Best Match</option>
              <option defaultValue={constants.LOW_TO_HIGH} value={constants.LOW_TO_HIGH}>Price low to hight</option>
              <option defaultValue={constants.HIGH_TO_LOW} value={constants.HIGH_TO_LOW}>Price hight to low</option>
            </select>
          </div>

          <div className='filter-top-view flex align-center'>
            <p className='op-7 text-dark fs-13'>View:</p>
            <button type='button' className='grid-btn'>
              <BsFillGridFill onClick={() => setGridView(filterDispatch)} title='Grid View'/>
            </button>
            <button type='button' className='list-btn'>
              <FaThList onClick={() => setListView(filterDispatch)} title='List View'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterView
