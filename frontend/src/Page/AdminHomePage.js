import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/Admin/AdminProductList'

function AdminHomePage() {
  return (
    <div>
        <Navbar>
            <AdminProductList/>
        </Navbar>
    </div>
  )
}

export default AdminHomePage