import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductForm from '../features/Admin/ProductForm'

function AdminAddProduct() {
  return (
    <div>
        <Navbar>
            <ProductForm/>
        </Navbar>
    </div>
  )
}

export default AdminAddProduct