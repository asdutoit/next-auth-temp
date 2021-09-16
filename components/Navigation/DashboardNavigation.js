import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut, getSession } from 'next-auth/client';
import { classNames } from '../../utils/general';

export default function DashboardNavigation({
    setnavoption,
    profile,
    navoption,
}) {
    const router = useRouter();
    const [session, loading] = useSession();

    return (
        <>
            {/* <div className="h-14 bg-white flex items-center pl-36 pr-36"> */}
            {profile.map((link, i) => (
                <button
                    className={classNames(
                        navoption === link.name
                            ? 'border-yellow-400 border-b-2'
                            : null,
                        'hover:border-b-2 hover:border-yellow-400 px-3 py-2 h-full text-md font-medium flex items-center text-gray-700 '
                    )}
                    onClick={() => setnavoption(link.name)}
                    key={i}
                >
                    {link.name}
                </button>
            ))}
            {/* </div> */}
        </>
    );
}
