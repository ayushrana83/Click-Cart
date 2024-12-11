import React, { useEffect } from "react";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import SignUpPage from "./Page/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./Page/CartPage";
import CheckOut from "./Page/CheckOut";
import ProductDetailPage from "./Page/ProductDetailPage";
import Protected from "../src/features/Auth/Components/Protected.js";
import AdminProtected from "../src/features/Auth/Components/AdminProtected.js";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectCheckedUser, selectLoggedInUser } from "./features/Auth/AuthSlice.js";
import { getUserCartAsync } from "./features/Cart/CartSlice.js";
import PageNotFound from "./Page/PageNotFound.js";
import OrderSuccessPage from "./Page/OrderSuccessPage.js";
import UserOrderPage from "./Page/UserOrderPage.js";
import { getUserInfoAsync } from "./features/User/UserSlice.js";
import UserProfilePage from "./Page/UserProfilePage.js";
import Logout from "./features/Auth/Components/Logout.js";
import ForgotPasswordPage from "./Page/ForgotPasswordPage.js";
import AdminHomePage from "./Page/AdminHomePage.js";
import AdminProductDetailPage from "./Page/AdminProductDetailsPage.js";
import AdminAddProduct from "./Page/AdminAddProduct.js";
import AdminOrdersPage from "./Page/AdminOrdersPage.js";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./features/Stripe/StripeCheckout.js";
import ResetPasswordPage from "./Page/ResetPasswordPage.js";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        {" "}
        <AdminHomePage />{" "}
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <AdminProtected>
        {" "}
        <AdminAddProduct />{" "}
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <AdminProtected>
        {" "}
        <AdminAddProduct />{" "}
      </AdminProtected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        {" "}
        <CartPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        {" "}
        <CheckOut />{" "}
      </Protected>
    ),
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "admin/products/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailPage />
      </AdminProtected>
    ),
  },
  {
    path: "admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage />
      </AdminProtected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        {" "}
        <OrderSuccessPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        {" "}
        <UserOrderPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <Protected>
        {" "}
        <UserProfilePage />{" "}
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        {" "}
        <Logout />{" "}
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        {" "}
        <StripeCheckout />{" "}
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const checkedUser = useSelector(selectCheckedUser);
  useEffect(() => {
    dispatch(checkAuthAsync());
  } , []) 

  useEffect(() => {
    if (user) {
      // console.log("abcdef0")
      dispatch(getUserCartAsync());
      dispatch(getUserInfoAsync());
    }
  }, [dispatch, user]);
  // console.log(user);
  return (
    <div className="bg-gray-50">
      {checkedUser && <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>}
    </div>
  );
}

export default App;
