import React, { useContext } from 'react'
import images from '../../ultis/images';
import "../../style/HomePage.scss"
import Title from '../../components/common/Title';
import { ProductContext } from '../../context/productContext';
import Preloader from '../../components/common/Preloader';
import FilterView from '../../components/common/FilterView';
import ProductList from '../../components/common/ProductList';
import { FilterContext } from '../../context/filterContext';
import { ToastContainer } from 'react-toastify'


const HomePage = () => {
  const {productsLoading} = useContext(ProductContext)
  const { filtered_products } = useContext(FilterContext);
  return (
    <main className="bg-secondary">
        <section className="sc-banner">
            <div className="banner-item h-100 img-cover">
                <img src={images.banner_1} alt="banner1" className="img-cover" />
            </div>
        </section>

        <section className="sc-wrapper py-5">
          <Title title={"Out Products"} />
          {
            productsLoading ? <Preloader /> : <div>
              <FilterView />
              <br /> <br />
              <ProductList products={filtered_products} />
            </div>
          }
        </section>

        <ToastContainer />
    </main>
  )
}

export default HomePage
