import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/Product-list/Components/ProductList'
import Footer from '../features/Common/Footer'

function HomePage() {
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default HomePage