import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/User/Components/UserProfile'

function UserProfilePage() {
  return (
    <div>
        <Navbar>
        <h1 className="text-4xl underline font-bold tracking-tight text-gray-900">
              My Profile
            </h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div>
  )
}

export default UserProfilePage