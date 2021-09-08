import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut, getSession } from 'next-auth/client';
import { classNames } from '../../utils/general';

const profile = [
    { name: 'Profile', href: '/#', current: false },
    { name: 'Add New Property', href: '/#', current: false },
    { name: 'Properties', href: '/#', current: false },
];

export default function DashboardNavigation() {
    const router = useRouter();
    const [session, loading] = useSession();

    return (
        <>
            {/* <div className="h-14 bg-white flex items-center pl-36 pr-36"> */}
            {profile.map((link) => (
                <Link key={link.name} href={link.href}>
                    <a
                        className={classNames(
                            router.pathname === link.href
                                ? 'hover:border-b-2 hover:border-yellow-400'
                                : 'hover:border-b-2 hover:border-yellow-400',
                            'px-3 py-2 h-full text-md font-medium flex items-center text-gray-700 '
                        )}
                    >
                        {link.name}
                    </a>
                </Link>
            ))}
            {/* </div> */}
        </>
    );
}
