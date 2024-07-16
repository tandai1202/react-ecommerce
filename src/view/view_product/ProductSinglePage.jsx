import React, { useContext, useEffect, useState } from 'react'
import images from '../../ultis/images'
import { Link, useParams } from 'react-router-dom'
import { ProductContext } from '../../context/productContext';
import "../../style/ProductSinglePage.scss";
import { AiFillCheckCircle, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { calculateDiscountedPrice, formatPrice } from '../../ultis/helpers';
import { BasketContext } from '../../context/basketContext';
import { MdCancel } from 'react-icons/md';
import { AuthContext } from '../../context/authContext';

const ProductSinglePage = () => {
  const {id} = useParams();
  const {getSingleProduct, dispatch: productDispatch, singleProduct} = useContext(ProductContext)
  const [quantity, setQuantity] = useState(1)
  const [previewImg, setPreviewImg] = useState(0);
  const {addToBasket, dispatch: basketDispatch, setBasketMsgOff, setBasketMsgOn, basketMsgStatus}  = useContext(BasketContext)
  const {authData} = useContext(AuthContext);

  const increaseQty = () => {
    setQuantity(prevQty => {
      let temQty = prevQty + 1;
      if (temQty > singleProduct?.sock) temQty = singleProduct?.sock;
      return temQty;
    })
  }

  const decreaseQty = () => {
    setQuantity(prevQty => {
      let temQty = prevQty - 1;
      if (temQty < 1) temQty = 1;
      return temQty;
    })
  }

  const basketHandler = (product) => {
    let discountedPrice = calculateDiscountedPrice(product?.price, product?.discountPercentage);
    let totalPrice = quantity * discountedPrice;
    addToBasket(basketDispatch, {...product, quantity: quantity, totalPrice: discountedPrice, checkoutStatus: false});
    setBasketMsgOn(basketDispatch)
  }

  useEffect(() => {
    setBasketMsgOff(basketDispatch)
    getSingleProduct(productDispatch, id)
  }, [id])

  return (
    <main className='bg-secondary'>
    {/* shopping alert */}
    <div className={`basket-alert ${basketMsgStatus ? 'show' : ''}`}>
      <div className='alert-content'>
        <div className='alert-msg grid px-4'>
          <AiFillCheckCircle size={20} className='text-line' />
          <p className='fs-13'>A new item has been added to your Shopping Cart. You now have 1 item in your Shopping Cart.</p>
        </div>
        <div className='basket-alert-btns px-4 py-4'>
          <button type='button' className='alert-close-btn' onClick={() => setBasketMsgOff(basketDispatch)}>
            <MdCancel size={22} className='text-dark' />
          </button>
          <Link to="/basket" className='alert-btn fs-13 text-white bg-primary'>View Shopping Cart</Link>
          <Link to="/home" className='alert-btn fs-13 text-primary'>Continue Shopping Cart</Link>
        </div>
      </div>
    </div>
    {/* end shopping alert */}
    
      <div className='container'>
        <div className='sc-wapper py-5'>
          <div className='product-s bg-white grid'>
            <div className='product-s-img'>
              <div className='img-preview py-5'>
                <div className='img-preview-zoom'>
                  <img src={singleProduct?.images ? singleProduct.images[previewImg] ? singleProduct.images[previewImg] : images.no_image : images.no_image} alt={singleProduct?.title} className='img-cover' />
                </div>
                <div className='img-preview-collection flex justify-center'>
                  {
                    singleProduct?.images?.map((image, id) => {
                      return (
                        <div className={`collection-item ${previewImg === id ? 'collection-item-active' : ''}`} key={id} onClick={() => setPreviewImg(id)}>
                          <img src={images ? image : images.no_image} alt={singleProduct?.title} className='img-cover' />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className='product-s-details py-5'>
            <div className='title fw-6 fs-16 px-3 py-1'>
              {singleProduct?.title}
            </div>
            <p className='description fs-14'>{singleProduct?.description}</p>
            <div className='rating my-2 flex align-center'>
              <AiOutlineStar size={16} className='text-yellow' />
              <span className='mx-1 fs-13'>{singleProduct?.rating}</span>
            </div>
            <div className='price flex align-center'>
              <span className='discounted-price fs-20 fw-7'>
                {
                  (singleProduct?.price && singleProduct?.discountPercentage) ? formatPrice(calculateDiscountedPrice(singleProduct.price, singleProduct.discountPercentage)) : 0
                }
              </span>
              <span className='actual-price text-dark mx-3'>{formatPrice(singleProduct?.price)}</span>
              <span className='discount-percent text-primary fs-12'>{singleProduct?.discountPercentage}%</span>
            </div>

            <div className='quantity py-3'>
              <h5 className='fw-4'>Quantity:</h5>
              <div className='quantity-toggle flex'>
              <button className='qty-dec flex align-center justify-center' onClick={() => decreaseQty()}>
                  <AiOutlineMinus  size={14}/>
                </button>
                <div className='qty-value flex algin-center justify-center fs-14 mx-2'>{quantity}</div>
                <button className='qty-dec flex align-center justify-center' onClick={() => increaseQty()}>
                  <AiOutlinePlus  size={14}/>
                </button>
              </div>
            </div>

            <div className='info py-1 flex flex-wrap align-center'>
              <div className='fs-13'>
                <span className='fw-6'>Brand:</span>
                <span className='px-1'>{singleProduct?.brand}</span>
              </div>
              <div className='fs-13 mx-3'>
                <span className='fw-6'>Category:</span>
                <span className='px-1'>{singleProduct?.category}</span>
              </div>
            </div>

            <div className='shop-btns'>
              <Link to="/login" className="buy-btn shop-btn fs-14">Buy now</Link>
              {
                authData.isLoggedIn ? <button className='add-to-cart-btn shop-btn fs-14' onClick={() => basketHandler(singleProduct)}>Add to Cart</button> : <Link to="login" className='add-to-cart-btn shop-btn fs-14'>Add to cart</Link>
              }
              
              
            </div>
          </div>
            
          </div>
          
        </div>
      </div>
    </main>
  )
}

export default ProductSinglePage
