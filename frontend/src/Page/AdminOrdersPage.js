import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrders from '../features/Admin/AdminOrders'

function AdminOrdersPage() {
  return (
    <div>
        <Navbar>
            <AdminOrders/>
        </Navbar>
    </div>
  )
}

export default AdminOrdersPage