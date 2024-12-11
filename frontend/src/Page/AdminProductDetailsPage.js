import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/Admin/AdminProductDetails'

function HomePage() {
  return (
    <div>
        <Navbar>
            <AdminProductDetails/>
        </Navbar>
    </div>
  )
}

export default HomePage