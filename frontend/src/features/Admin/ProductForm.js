import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  getProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from "../Product-list/ProductSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Modal from "../Common/Modal.js";
import { Checkbox } from "@headlessui/react";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  // console.log(selectedProduct);
  const alert = useAlert();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(getProductByIdAsync(params.id));
    }
  }, [params.id, dispatch]);

  const colors = [
    { value: "White", id: "White" },
    { value: "Gray", id: "Gray" },
    { value: "yellow", id: "yelloow" },
    { value: "orange", id: "orange" },
    { value: "blue", id: "blue" },
    { value: "green", id: "green" },
    { value: "Black", id: "Black" },
  ];
  const sizes = [
    { value: "XXS", id: "XXS", inStock: true },
    { value: "XS", id: "XS", inStock: true },
    { value: "S", id: "S", inStock: true },
    { value: "M", id: "M", inStock: true },
    { value: "L", id: "L", inStock: true },
    { value: "XL", id: "XL", inStock: true },
    { value: "2XL", id: "2XL", inStock: true },
    { value: "3XL", id: "3XL", inStock: true },
  ];

  useEffect(() => {
    if (selectedProduct && params.id) {
      const product = selectedProduct;
      // console.log(product);
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("thumbnail", product.thumbnail);
      setValue("stock", product.stock);
      setValue("image1", product.images ? product.images[0] : "");
      setValue("image2", product.images ? product.images[1] : "");
      setValue("image3", product.images ? product.images[2] : "");
      setValue(
        "highlight1",
        product.highlights ? product.highlights[0] : ""
      );
      setValue(
        "highlight2",
        product.highlights ? product.highlights[1] : ""
      );
      setValue(
        "highlight3",
        product.highlights ? product.highlights[2] : ""
      );
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue(
        "sizes",
        product.sizes ? product.sizes.map((size) => size.id) : []
      );
      setValue(
        "colors",
        product.colors ? product.colors.map((color) => color.id) : []
      );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct, deleted: true };
    // console.log(selectedProduct);
    dispatch(updateProductAsync(product));
    alert.info("Product Deleted");
    reset();
  };
  // console.log(selectedProduct);
  return (
    <>
      {selectedProduct?.deleted && (
        <div>
          <p className="text-sm text-red-500">Product Deleted</p>
        </div>
      )}
      {selectedProduct?.stock == 0 && (
        <div>
          <p className="text-sm text-red-500">Out of Stock</p>
        </div>
      )}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          const product = { ...data };
          // console.log(product);
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
          ];
          
          product.rating = 1;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          delete product["highlight1"];
          delete product["highlight2"];
          delete product["highlight3"];
          product.sizes = product.sizes.map((size) =>
            sizes.find((sz) => sz.id == size)
          );
          product.colors = product.colors.map((color) =>
            colors.find((clr) => clr.id == color)
          );
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          // console.log(product);

          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            alert.info("product updated");
            reset();
          } else {
            dispatch(addProductAsync(product));
            alert.info("product added");
            reset();
          }
          navigate("/");
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "name is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">-- choose brand --</option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option>-- choose category --</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="Size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2 flex">
                  {sizes.map((size) => (
                    <div className="p-3">
                      <input
                        className="p-1"
                        type="checkbox"
                        {...register("sizes", {})}
                        key={size.id}
                        value={size.id}
                      />{" "}
                      {size.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="Size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2 flex">
                  {colors.map((color) => (
                    <div className="p-3">
                      <input
                        className="p-1"
                        type="checkbox"
                        {...register("colors", {})}
                        key={color.id}
                        value={color.id}
                      />{" "}
                      {color.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>


              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  highlight 1 
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight1", {
                      })}
                      id="highlight1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  highlight 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight2", {
                      })}
                      id="highlight2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  highlight 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight3", {
                      })}
                      id="highlight3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra{" "}
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>

          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={selectedProduct.title}
          showModal={openModal}
          dangerAction={() => handleDelete()}
          cancelAction={() => setOpenModal(false)}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;
