import { useState, useContext } from 'react';
import useForm from '../../utils/useForm';
import { useSession, signIn } from 'next-auth/client';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../context/Context';

const initialForm = { email: '', password: '' };

export default function signin() {
    const router = useRouter();
    const [session, loading] = useSession();
    const [emailSubmitLoading, setEmailSubmitLoading] = useState(false);
    const { inputs, handleChange } = useForm(initialForm);
    const { state, dispatch } = useContext(UserContext);

    //TODO: Replace with a better component or null
    if (loading) return <div />;

    // ====== CHECK IF USER IS ALREADY LOGGED IN ======
    if (session) {
        // dispatch
        router.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailSubmitLoading(!emailSubmitLoading);
        try {
            const response = await signIn('email', {
                email: inputs.email,
            });
            setEmailSubmitLoading(!emailSubmitLoading);
        } catch (error) {
            console.log(error);
        }
    };

    // ======= RENDER LOGIN PAGE =======

    return (
        <div className="h-full flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="btn-wrapper text-center">
                    <button
                        className="bg-white active:bg-gray-300 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                        type="button"
                        onClick={() =>
                            signIn(
                                'facebook',
                                {
                                    callbackUrl: '/',
                                },
                                {}
                            )
                        }
                    >
                        {/* <div className="w-5 mr-1">
              <FontAwesomeIcon icon={["fab", "github"]} />
            </div> */}
                        <img alt="..." className="w-5 mr-1" src="/img/fb.svg" />
                        Facebook
                    </button>
                    <button
                        className="bg-white active:bg-gray-300 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                    >
                        <img
                            alt="..."
                            className="w-5 mr-1"
                            src="/img/google.svg"
                        />
                        Google
                    </button>
                </div>
                <div className="mt-6 text-center font-medium text-gray-400">
                    <p>or</p>
                </div>
                <hr />
                <form
                    className="mt-8 space-y-6"
                    // action="/api/auth/signin/email"
                    // method="POST"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={
                                !emailSubmitLoading
                                    ? 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    : 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-200'
                            }
                            disabled={emailSubmitLoading}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            <svg
                                className={
                                    emailSubmitLoading
                                        ? 'animate-spin -ml-1 mr-3 h-5 w-5 text-white '
                                        : 'hidden -ml-1 mr-3 h-5 w-5 text-white'
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Sign In
                        </button>
                    </div>
                    <span className="text-xs text-indigo-900 italic">
                        Account will automatically be created if none exist
                    </span>
                </form>
            </div>
        </div>
    );
}
