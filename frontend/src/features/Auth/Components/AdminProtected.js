import React from 'react'
import { useSelector } from 'react-redux'
import {selectUserInfo} from '../../User/UserSlice'
import { Navigate } from 'react-router-dom';

function AdminProtected({children}) {
    const user = useSelector(selectUserInfo);

    if(!user)
    {
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
    if(user.role !== 'admin')
    {
        return <Navigate to={"/"} replace={true}></Navigate>
    }
  return (
    children
  )
}

export default AdminProtected