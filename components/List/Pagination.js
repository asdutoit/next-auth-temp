/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import ReactPaginate from 'react-paginate';

export default function Pagination({ count, limit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        let pageCount = [];
        function pages() {
            for (let i = 1; i <= Math.ceil(count / itemsPerPage); i++) {
                pageCount.push(i);
            }
            setPages(pageCount);
        }
        pages();
    }, [count]);

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
            <ReactPaginate
                previousLabel={
                    <ChevronLeftIcon className="h-4 w-5" aria-hidden="true" />
                }
                previousClassName={
                    'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50'
                }
                nextLabel={
                    <ChevronRightIcon className="h-4 w-5" aria-hidden="true" />
                }
                nextClassName={
                    'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50'
                }
                breakLabel={'...'}
                breakClassName={
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs font-medium text-gray-700'
                }
                pageCount={limit}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={() => console.log('tbc')}
                containerClassName={
                    'bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6'
                }
                pageClassName={
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-xs font-medium'
                }
                activeClassName={
                    'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-xs font-medium'
                }
            />
            {/* <div className="flex-1 flex justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">{limit}</span> of{' '}
                        <span className="font-medium">{count}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>*/}
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/* {pages.map((page) => {
                            return (
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    {page}
                                </a>
                            );
                        })} */}
            {/* <a
                            href="#"
                            aria-current="page"
                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                            1
                        </a>

                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                        </span>

                        <a
                            href="#"
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                            10
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                    </nav>
                </div>
            </div>  */}
        </div>
    );
}
