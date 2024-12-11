import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartProduct } from "../Cart/CartSlice";
import { selectUserInfo } from "../User/UserSlice";
import logo from "../../logo.svg";
import { useState } from "react";
import searchSvg from "../../app/search.svg";
import { getProductsByfilterAsync, searchProductAsync } from "../Product-list/ProductSlice";
import { motion } from "motion/react"
const navigation = [
  { name: "Products", Link: "/", user: true },
  { name: "Products", Link: "/admin", admin: true },
  { name: "orders", Link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", Link: "/my-profile" },
  { name: "My Orders", Link: "/my-orders" },
  { name: "Sign out", Link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const items = useSelector(selectCartProduct);
  const numberOfItems = items.length;
  const user = useSelector(selectUserInfo);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  // const [currentAnimation , setCurrentAnimation] = useState(false);

  const searchAndFind = () => {
    // console.log("Search" , search);
    if(search.length > 0)
    {
      dispatch(searchProductAsync(search.trim()));
      setSearch("");
    }
    else
    {
      dispatch(getProductsByfilterAsync({}));
    }
  }

  // const setAnimation = () => {
  //   if(currentAnimation)
  //   {
  //     return {opacity : 100 , y : 0};
  //   }
  //   else
  //   {
  //     return {opacity : 0 , y : -100};
  //   }
  // }
  // const setInitial = () => {
  //   if(currentAnimation)
  //   {
  //     return {opacity : 0 , y : -100 , x : 0};
  //   }
  //   else
  //   {
  //     return {opacity : 100 , y : 0 , x : 0};
  //   }
  // }

  // console.log(user);
  // console.log(items);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <img
                      alt="Your Company"
                      src={logo}
                      className="mx-auto h-16 w-auto"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {user &&
                      navigation.map((item) =>
                        item[user.role] ? (
                          <Link
                            key={item.name}
                            to={item.Link}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        ) : null
                      )}
                  </div>
                </div>
              </div>

              
                {showSearch && <div className="sm:col-span-2">
                  <div className="mt-2">
                    <motion.div 
                    initial={{opacity:0 , y:-100}}
                    animate={{opacity:100 , y:0}} 
                    exit={{ opacity: 0, y: -100 }}
                    transition={{duration : 0.5}} className="w-80 flex rounded-2xl shadow-sm ">
                      <div className="w-[85%] bg-gray-200 rounded-2xl">
                        <input
                          type="text"
                          id="search"
                          placeholder="@search"
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full  flex-1 rounded-2xl border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                        <button onClick={() => searchAndFind()} className="w-[25%] rounded-2xl ml-1 bg-gray-500">search</button>
                    </motion.div>
                  </div>
                </div>}
              

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div
                    onClick={() => {
                        setShowSearch(!showSearch);
                        // setCurrentAnimation(!currentAnimation);
                    }}
                    className={`w-10 h-10 mr-3 flex items-center justify-center cursor-pointer ${
                      showSearch
                        ? `border-2 border-gray-200 m-3 rounded-3xl`
                        : ``
                    }`}
                  >
                    <img src={searchSvg} className="w-6 h-6 " />
                  </div>
                  <Link
                    to={"/cart"}
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  </Link>
                  {numberOfItems > 0 && (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 mb-7 -ml-3 z-10  text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {numberOfItems}
                    </span>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={""} className="h-8 w-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.Link}
                            className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img alt="" src="" className="h-10 w-10 rounded-full" />
                </div>
                {user && (
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.name ? user?.name : user.id}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                )}
                <Link
                  to={"/cart"}
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                </Link>
                {numberOfItems > 0 && (
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs mb-7 -ml-3 z-10 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    {numberOfItems}
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-commerce
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */ children}
          </div>
        </main>
      </div>
    </>
  );
}
