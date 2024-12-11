import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/Product-list/Components/ProductDetails'
import Footer from '../features/Common/Footer'

function ProductDetailPage() {
  return (
    <div>
        <Navbar>
            <ProductDetails/>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default ProductDetailPage