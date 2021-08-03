import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function error() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="container mx-auto px-4 h-full ">
      <div className="flex justify-center h-full items-center">
        <div className="h-28 bg-gray-100 rounded-md p-4 pb-6 shadow-md  ">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-gray-700 dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate pb-4 pl-2">
              Error
            </h1>
          </div>
          {router.query.error === "google" ||
          router.query.error === "facebook" ? (
            <h2>
              Please log in with the{" "}
              <span className="capitalize font-bold text-blue-600">{`${router.query.error}`}</span>{" "}
              on the{" "}
              <span>
                <Link href="/auth/signin">
                  <a className="text-indigo-700">Signin Page</a>
                </Link>
              </span>
            </h2>
          ) : router.query.error === "OAuthAccountNotLinked" ? (
            <h2>
              Please log in with your{" "}
              <span className="capitalize font-bold text-blue-600">email</span>{" "}
              address on the{" "}
              <span>
                <Link href="/auth/signin">
                  <a className="text-indigo-700">Signin Page</a>
                </Link>
              </span>
            </h2>
          ) : (
            <h2>{router.query.error}</h2>
          )}
        </div>
      </div>
    </div>
  );
}
