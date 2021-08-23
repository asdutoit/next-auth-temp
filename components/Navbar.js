import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useSession, signOut, getSession } from 'next-auth/client';
import { classNames } from '../utils/general';
import { navigationLeft } from '../navigation/index';

export default function Navbar() {
    const router = useRouter();
    const [session, loading] = useSession();

    return (
        <Disclosure
            as="nav"
            className="bg-white w-full border-b border-gray-100"
        >
            {({ open }) => (
                <>
                    {/* <nav > */}
                    <div className="max-w-full mx-auto px-12">
                        <div className="flex justify-between">
                            <div className="flex space-x-4">
                                {/* <!-- mobile button goes here --> */}

                                <div className="md:hidden flex items-center">
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                {/* <!-- logo --> */}
                                <div>
                                    <Link href="/">
                                        <a className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-yellow-300 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                            <span className="font-bold">
                                                Happy Homes
                                            </span>
                                        </a>
                                    </Link>
                                </div>

                                <div className="hidden md:flex items-center space-x-1">
                                    {navigationLeft.map((link) => (
                                        <Link key={link.name} href={link.href}>
                                            <a
                                                className={classNames(
                                                    router.pathname ===
                                                        link.href
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-800',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                            >
                                                {link.name}
                                            </a>
                                        </Link>
                                    ))}
                                    {/* <!-- primary nav --> */}
                                </div>
                            </div>

                            {/* <!-- secondary nav --> */}
                            {session ? (
                                <div className="flex items-center">
                                    <Menu as="div" className="relative">
                                        {({ open }) => (
                                            <>
                                                <div className="flex items-center ">
                                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={
                                                                session.session
                                                                    .user.image
                                                            }
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        static
                                                        className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    >
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                // <Link href="/profile">
                                                                <a
                                                                    href="/profile"
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Your Profile
                                                                </a>
                                                                // </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 text-left w-full'
                                                                    )}
                                                                    onClick={() =>
                                                                        signOut(
                                                                            {
                                                                                callbackUrl:
                                                                                    '/',
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    Sign out
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                            ) : loading ? null : (
                                <div className=" flex justify-end lg:w-0 items-center ">
                                    <div>
                                        <Link href="/auth/signin">
                                            <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 transition duration-300 ease-in-out border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 hover:text-white  ">
                                                Sign in
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <!-- mobile menu --> */}
                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationLeft.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={
                                        item.current ? 'page' : undefined
                                    }
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
