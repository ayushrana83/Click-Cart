import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logoutUserAsync, selectLoggedInUser } from '../AuthSlice'
import { useAlert } from 'react-alert';

function Logout() {
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    const alert = useAlert();

    console.log("user ",user);
    useEffect(()=>{
      if(user)
      {
        dispatch(logoutUserAsync());
        // alert.show('Logged out')
      }
    },[]);
  return (
    <>
    {!user && <Navigate to={"/"} replace={true}></Navigate>}
    </>
  )
}

export default Logout