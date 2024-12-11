import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrder from '../features/User/Components/UserOrder'

function UserOrderPage() {
  return (
    <div>
        <Navbar>
        <h1 className="text-4xl underline font-bold tracking-tight text-gray-900">
              My Orders
            </h1>
            <UserOrder></UserOrder>
        </Navbar>
    </div>
  )
}

export default UserOrderPage