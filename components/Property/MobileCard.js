/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { numFormatter } from '../../utils/numFormatter';

export default function MobileCard({
    mobileIsOpen,
    setMobileIsOpen,
    property,
}) {
    const cancelButtonRef = useRef(null);
    const price = numFormatter(property.community.price_max);

    return (
        <Transition.Root show={mobileIsOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setMobileIsOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 pb-4 mx-2 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 " />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    {/* <div className="mx-auto flex items-center justify-center w-full h-10  bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        hello
                                    </div> */}

                                    <Image
                                        src={property.photos[0].href}
                                        width="375"
                                        height="200"
                                        layout="responsive"
                                        alt="nice pick"
                                        priority="true"
                                    />
                                    <div className="mt-3 mb-3 pl-3 pr-3 sm:mt-0 sm:ml-4 sm:text-left">
                                        <div className="flex justify-between">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xs leading-6"
                                            >
                                                {/* {console.log(property)} */}
                                                {`${property.address.line}, ${property.address.neighborhood_name}, ${property.address.city}, ${property.address.postal_code} `}
                                            </Dialog.Title>
                                            <div className="text-xs">
                                                Listed by{' '}
                                                <span className="font-bold">
                                                    Judy Greer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="flex justify-between">
                                                <div className="align-center flex text-gray-700 text-sm font-bold items-center">
                                                    <div className="flex ">
                                                        {`${property.community.beds_max} Beds`}
                                                    </div>
                                                    <div
                                                        style={{
                                                            borderRight:
                                                                '1px solid #000',
                                                            marginLeft: '5px',
                                                            marginRight: '5px',
                                                            height: '16px',
                                                        }}
                                                    >
                                                        {' '}
                                                    </div>
                                                    <div className="flex">
                                                        {`${property.community.baths_max} Baths`}
                                                    </div>
                                                    <div
                                                        style={{
                                                            borderRight:
                                                                '1px solid #000',
                                                            marginLeft: '5px',
                                                            marginRight: '5px',
                                                            height: '16px',
                                                        }}
                                                    >
                                                        {' '}
                                                    </div>
                                                    <div className="flex">
                                                        {`${
                                                            property.community
                                                                .sqft_max ===
                                                            null
                                                                ? 'N/A'
                                                                : property
                                                                      .community
                                                                      .sqft_max
                                                        } sqm`}
                                                    </div>
                                                </div>
                                                <div className="align-center flex text-gray-700 text-xl font-black">
                                                    {`R ${price} pm`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setMobileIsOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
