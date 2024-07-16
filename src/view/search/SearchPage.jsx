import React, { useContext, useEffect } from 'react'
import { searchContext } from '../../context/searchContext'
import { useParams } from 'react-router-dom'
import { FaHourglassEnd } from 'react-icons/fa'
import { Preloader, ProductList, Title } from '../../components/common'

const SearchPage = () => {
  const {getSearchProducts, dispatch: searchDispatch, searchResult, searchLoading} = useContext(searchContext)
  const {searchKey} = useParams();

  useEffect(() => {
    getSearchProducts(searchDispatch, searchKey)
  }, [searchKey])

  if(searchResult.length === 0) {
    return (
      <main className='bg-secondary'>
        <div className='container'>
          <div className='sc-wrapper py-5'>
            <p className='text-center fs-20 fw-7 text-primary flex align-center justify-center'>
              <FaHourglassEnd />
              <span className='px-2'>No products found!</span>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper py-5'>
          <Title title={"Your search result"} />
          <br/> <br/>
          {
            searchLoading ? <Preloader /> : <ProductList products={searchResult}/>
          }
        </div>
      </div>
    </main>
  )
}

export default SearchPage
