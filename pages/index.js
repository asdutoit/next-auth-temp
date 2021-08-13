import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Tailwind Next</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center justify-center min-h-full py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"></main>

                <footer className="flex items-center justify-center w-full h-24 border-t">
                    <a
                        className="flex items-center justify-center text-gray-800"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Designed and Developed with{'  '}
                        <span className="text-red-600 pl-1 pr-1"> ♥️ </span> in
                        sunny Cape Town
                    </a>
                </footer>
            </div>
        </>
    );
}
