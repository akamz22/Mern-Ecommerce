import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { Rating } from "@material-tailwind/react";

import { ITEMS_PER_PAGE } from '../../../app/constants';

import {
  fetchAllPorductsByFilterAsync,
  fetchAllProductsAsync,
  selectAllProducts,
} from '../ProductSlice';


const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'beauty', label: 'Beauty', checked: false },
      { value: 'fragrances', label: 'Fragrances', checked: false },
      { value: 'furniture', label: 'Furniture', checked: false },
      { value: 'groceries', label: 'Groceries', checked: false },
      { value: 'home_decoration', label: 'Home Decoration', checked: false },
      { value: 'kitchen_accessories', label: 'Kitchen Accessories', checked: false },
      { value: 'laptops', label: 'Laptops', checked: false },
      { value: 'mens_shirts', label: 'Mens Shirts', checked: false },
      { value: 'mens_shoes', label: 'Mens Shoes', checked: false },
      { value: 'mens_watches', label: 'Mens Watches', checked: false },
      { value: 'mobile_accessories', label: 'Mobile Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'essence', label: 'Essence', checked: false },
      { value: 'glamour_beauty', label: 'Glamour Beauty', checked: false },
      { value: 'velvet_touch', label: 'Velvet Touch', checked: false },
      { value: 'chic_cosmetics', label: 'Chic Cosmetics', checked: false },
      { value: 'nail_couture', label: 'Nail Couture', checked: false },
      { value: 'calvin_klein', label: 'Calvin Klein', checked: false },
      { value: 'chanel', label: 'Chanel', checked: false },
      { value: 'dior', label: 'Dior', checked: false },
      { value: 'dolce_gabbana', label: 'Dolce & Gabbana', checked: false },
      { value: 'gucci', label: 'Gucci', checked: false },
      { value: 'annibale_colombo', label: 'Annibale Colombo', checked: false },
      { value: 'furniture_co', label: 'Furniture Co.', checked: false },
      { value: 'knoll', label: 'Knoll', checked: false },
      { value: 'bath_trends', label: 'Bath Trends', checked: false },
      { value: 'apple', label: 'Apple', checked: false },
      { value: 'asus', label: 'Asus', checked: false },
      { value: 'huawei', label: 'Huawei', checked: false },
      { value: 'lenovo', label: 'Lenovo', checked: false },
      { value: 'dell', label: 'Dell', checked: false },
      { value: 'fashion_trends', label: 'Fashion Trends', checked: false },
      { value: 'gigabyte', label: 'Gigabyte', checked: false },
      { value: 'fashion_timepieces', label: 'Fashion Timepieces', checked: false },
      { value: 'longines', label: 'Longines', checked: false },
      { value: 'rolex', label: 'Rolex', checked: false },
      { value: 'amazon', label: 'Amazon', checked: false },
    ],
  }
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  console.log("PRO : ",products.data);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({})
  const [page, setPage] = useState(1)


  // {TODO Pagination http://localhost:8080/products?_page=1&_limit=10}

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter }
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      }else{
        newFilter[section.id] = [option.value]
      }
    } else {
      const index = newFilter[section.id]?.findIndex(el => el === option.value)
      newFilter[section.id].splice(index,1);
    }
    setFilter(newFilter)
    // dispatch(fetchAllPorductsByFilterAsync(newFilter))
    console.log(section.id, option.value);
  }

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order }
    console.log(sort);
    setSort(sort);
  }
  const handlePage = (page) => {
    console.log({page});
    setPage(page);
  }

  useEffect(() => {
    const pagination = {_page:page,_per_page:ITEMS_PER_PAGE}
    // dispatch(fetchAllProductsAsync(filter))
    dispatch(fetchAllPorductsByFilterAsync({ filter, sort ,pagination}))
  }, [dispatch, filter, sort,page])

  return (
    <div>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilters
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          ></MobileFilters>



          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={e => handleSort(e, option)}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Product Section */}

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              {/* Filters */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                <DesktopFilters handleFilter={handleFilter}
                  filters={filters} />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* This is product List */}
                  <ProductGrid products={products} />
                </div>
                {/* Product grid end */}
              </div>

            </section>
            {/* Pagination */}
            <Pagination page ={page}
            setPage={setPage}
            handlePage={handlePage}/>
          </main>
        </div>
      </div>
    </div>
  );
}


const MobileFilters = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">


                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

const DesktopFilters = ({ handleFilter, filters }) => {
  return (

    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={e => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  )
}

const ProductGrid = ({ products }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            
            console.log("Pro Api: " + products)
          }
          {
          products?.map((product) => (
            <Link to="/product-details">
              <div key={product.id} className="group relative shadow-md p-2 h-full hover:scale-105 transition-all">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    {/* <Rating value={4} readonly /> */}
                    <div className="mt-1 text-sm text-gray-500">
                      <span className='aligh-bottom'>{product.rating} </span>
                      <StarIcon className='h-6 w-6 inline align-bottom text-yellow-500'></StarIcon>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                    <p className="text-sm line-through font-medium text-gray-400">${product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


const Pagination = ({page ,setPage,handlePage,totalItems=55}) => {
  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE +1}</span> to {' '}
              <span className="font-medium">{page*ITEMS_PER_PAGE}</span> of {' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
             {Array.from({length:Math.ceil(totalItems/ITEMS_PER_PAGE)}).map((ele,index)=>(

               <div
               key={index*4}
                 onClick={()=>handlePage(index+1)}
                 aria-current="page"
                 className={`relative cursor-pointer z-10 inline-flex items-center ${index+1===page?'bg-indigo-600 text-white': 
                  'bg-white text-gray-400'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
               >
                 {index+1}
               </div>
          
             ))

             }
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
