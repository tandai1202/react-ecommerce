import React from 'react'
import "../../style/BasketPage.scss"
import images from "../../ultis/images"

const PaymentMethods = () => {
  return (
    <div className='payment-methods py-4 bg-white px-4'>
      <h3>Payment methods</h3>
      <div className='flex align-center justify-start payment-methods-list py-3'>
        <div className='payment-item'>
          <img src={images.visa} alt=''/>
        </div>
        <div className='payment-item'>
          <img src={images.ucb} alt=''/>
        </div>
        <div className='payment-item'>
          <img src={images.mastercard} alt=''/>
        </div>
        <div className='payment-item'>
          <img src={images.americanexpress} alt=''/>
        </div>
      </div>
      <h3 className='py-2'>Buyer Protection</h3>
      <p className='fs-14'>Get full refuned if the item is not as decsribed or if not delivered</p>
    </div>
  )
}

export default PaymentMethods
