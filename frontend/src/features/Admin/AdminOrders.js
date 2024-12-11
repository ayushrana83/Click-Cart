import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../app/Constants";
import {
  getAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../Order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../Common/Pagination";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { useAlert } from "react-alert";


function AdminOrders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const orders = useSelector(selectOrders);
  // console.log(orders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const alert = useAlert();

  const handleEdit = (order) => {
    // console.log(order);
    setEditableOrderId(order._id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    alert.show('Cart Updated');
    setEditableOrderId(-1);
  };

  function chooseColor(status) {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  }

  const handleSort = (sortOptions) => {
    const newSort = { _sort: sortOptions.sort, _order: sortOptions.order };
    setSort(newSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    // console.log(pagination);
    dispatch(getAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded ">
            <table className="w-full ">
              <thead className="">
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 cursor-pointer px-3 text-left "
                    onClick={() =>
                      handleSort({
                        sort: "id",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline" />
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline" />
                      ))}
                  </th>
                  <th className="py-3 px-3 text-left">Items</th>
                  <th
                    className="py-3 px-3 text-center cursor-pointer"
                    onClick={() => {
                      handleSort({
                        sort: "totalAmount",
                        order: sort._order === "asc" ? "desc" : "asc",
                      });
                    }}
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline"/>
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline"/>
                      ))}
                  </th>
                  <th className="py-3 px-3 text-center">Address</th>


                  <th
                    className="py-3 px-3 text-center cursor-pointer"
                    onClick={() => {
                      handleSort({
                        sort: "createdAt",
                        order: sort._order === "asc" ? "desc" : "asc",
                      });
                    }}
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline"/>
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline"/>
                      ))}
                  </th>

                  <th
                    className="py-3 px-3 text-center cursor-pointer"
                    onClick={() => {
                      handleSort({
                        sort: "updatedAt",
                        order: sort._order === "asc" ? "desc" : "asc",
                      });
                    }}
                  >
                    Last Updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-6 h-6 inline"/>
                      ) : (
                        <ArrowDownIcon className="w-6 h-6 inline"/>
                      ))}
                  </th>

                  <th className="py-3 px-3 text-center">Status</th>

                  
                  
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders && orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-3 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">#{order._id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-left">
                      {order.items && order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-16 h-16 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.product.quantity} - $
                            {item.product.discountedPrice}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {order.selectedAddress && <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div> }
                    </td>
                    
                    <td className="py-3 px-3 text-center">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {order._id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order.product)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
