import React, { useContext, useEffect } from 'react'
import { BasketContext } from '../../context/basketContext'
import { FaHourglassEnd } from 'react-icons/fa'
import { BasketItem, CheckoutSummary, PaymentMethods } from '../../components/common'

const BasketPage = () => {

  const { basket, dispatch: basketDispatch, clearBasket, checkoutTotal, checkoutCount, getCheckoutTotal, setCheckoutAll, unsetCheckoutAll, checkoutAll} = useContext(BasketContext)

  console.log(checkoutTotal, checkoutCount)

  useEffect(() => {
    getCheckoutTotal(basketDispatch)
  }, [basket])

  const checkallHandler = (e) => {
    if (e.target.checked) {
      setCheckoutAll(basketDispatch)
    } else {
      unsetCheckoutAll(basketDispatch)
    }
  }

  if (basket.length === 0) {
    return (
      <main className='bg-secondary'>
        <div className='container'>
          <div className='sc-wrapper py-4 flex align-center justify-center'>
            <FaHourglassEnd />
            <h3 className='mx-2'>No items found in the cart</h3>
          </div>
        </div>
      </main>
    )
  } 

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper'>
          <div className='basket grid'>
            {/* basket alert */}
            <div className='basket-l py-4'>
              <div className='basket-top bg-white py-3 px-4'>
                <h2>Shopping Cart <span className='text-primary'>2</span></h2>
                <div className='flex align-center justify-between'>
                  <div className='checkbox-item flex py-3'>
                    <div className='checkbox-icon flex align-center'>
                      <input type='checkbox' className='form-control' id='checkall' onChange={checkallHandler} checked={checkoutAll} />
                    </div>
                    <p className='form-text'>Select all items</p>
                  </div>
                  <button type='button' className='fw-7 fs-16 text-primary' onClick={() => clearBasket(basketDispatch)}> Delete</button>
                </div>
              </div>

              <div className='basket-list bg-white my-3'>
                {
                  basket.map(basketItem => {
                    return (
                      <BasketItem item={basketItem} key={basketItem.id} />
                    )
                  })
                }
              </div>
            </div>

            {/* basket right paypal */}
            <div className='basket-r py-4 '>
              <CheckoutSummary checkoutCount={Number(checkoutCount)} checkoutTotal={Number(checkoutTotal)}/>
              <PaymentMethods />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BasketPage
