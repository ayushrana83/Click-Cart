import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemIncartAsync,
  selectCartProduct,
  updateCartAsync,
  selectCartStatus,
  resetCartAsync,
} from "../features/Cart/CartSlice.js";
import { useForm } from "react-hook-form";
import {
  addOrderAsync,
  selectCurrOrder,
} from "../features/Order/OrderSlice.js";
import { selectUserInfo, updateUserAsync } from "../features/User/UserSlice.js";
import { useAlert } from "react-alert";
import { selectCheckedUser } from "../features/Auth/AuthSlice.js";

export default function CheckOut() {
  const items = useSelector(selectCartProduct);
  // console.log(items);
  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const user = useSelector(selectUserInfo);
  const checkedUser = useSelector(selectCheckedUser);
  // console.log(checkedUser , items.length);

  // console.log(user);
  const alert = useAlert();
  const totalAmount = Math.round(
        items.reduce(
          (amount, item) =>
            item.quantity * item.product.discountedPrice + amount,
          0
        )
      );
  const totalItems = items.reduce((count, item) => item.quantity + count, 0);
  const dispatch = useDispatch();
  const currOrder = useSelector(selectCurrOrder);
  // console.log(currOrder);

  const handleCartUpdate = (e, item) => {
    dispatch(
      updateCartAsync({
        cartId: items[0]._id,
        id: item.id,
        quantity: +e.target.value,
      })
    );
    alert.info("Cart Updated");
  };

  const handleDeleteItem = (e, itemId) => {
    e.preventDefault();
    dispatch(deleteItemIncartAsync(itemId));
    alert.info("Item deleted");
  };

  const handleSelectAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddOrder = (e) => {
    if (selectedAddress === null) {
      alert.error("select an address");
      return;
    }
    const order = {
      items,
      totalAmount,
      totalItems,
      selectedAddress,
      user: user.id,
      paymentMethod,
      status: "pending",
    };
    // console.log(order);
    dispatch(addOrderAsync(order));
    dispatch(resetCartAsync());
    alert.success("Order placed");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {checkedUser && selectCartStatus === "idle" && items.length == 0 && (
        <Navigate to={"/"}></Navigate>
      )}
      {currOrder && currOrder.paymentMethod === "cash" && (
        <Navigate to={"/order-success/" + currOrder.items[0]._id}></Navigate>
      )}
      {currOrder && currOrder.paymentMethod === "online" && (
        <Navigate to={"/stripe-checkout"}></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1  gap-x-8 py-5 gap-y-10 lg:grid-cols-5">
          {/* checkout form */}
          <div className="lg:col-span-3 bg-white py-2">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                // console.log(data);
                reset();
              })}
            >
              <div className="space-y-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", { required: "name required" })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.name?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: "email required" })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.email?.message}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          id="tel"
                          {...register("phone", {
                            required: "phone number required",
                          })}
                          type="number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.phone?.message}</p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "street required",
                          })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.street?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", { required: "city required" })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.city?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", { required: "state required" })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.state?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required: "pin code required",
                          })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.pinCode?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing Address
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {checkedUser &&
                      user &&
                      user.addresses &&
                      user.addresses.map((addrs, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 mb-2 py-2 border rounded-xl p-2"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              value={index}
                              name="address"
                              type="radio"
                              onChange={handleSelectAddress}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {addrs.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {addrs.street}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              city : {addrs.city}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              phone : {addrs.phone}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <fieldset className="sm:col-span-3 mt-6">
                  <legend className="text-lg font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose payment method
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        value="cash"
                        onChange={handlePaymentMethod}
                        name="payment"
                        type="radio"
                        checked={paymentMethod == "cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash On Delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        value="online"
                        onChange={handlePaymentMethod}
                        name="payment"
                        type="radio"
                        checked={paymentMethod === "online"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="payment"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Online Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </form>
          </div>
          {/* cart */}
          <div className="lg:col-span-2  py-2">
            <div className="mx-auto px-2 mt-10 sm:px-3 lg:px-3 bg-white">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Shopping Cart
              </h1>
              <div className=" border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.images[0]}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link
                                  to={"/product-details/" + item.product.id}
                                >
                                  {item.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ${item.product.discountedPrice}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.category}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500 ">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) =>
                                  handleCartUpdate(e, item.product)
                                }
                                className=""
                                value={item.quantity}
                              >
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) =>
                                  handleDeleteItem(e, item.product.id)
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items in Cart : </p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleAddOrder}
                    // to={"/checkout"}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Place Order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link
                      to={"/"}
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
