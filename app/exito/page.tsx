'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
    const [showCheck, setShowCheck] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
            setShowCheck(true);
            const redirectTimer = setTimeout(() => {
                router.push('/preparados');
            }, 1000);

            return () => clearTimeout(redirectTimer);
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center mt-10 space-y-4">
            {showSpinner && (
                <div className="flex items-center justify-center w-16 h-16">
                    <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
            {showCheck && (
                <div className="transition-opacity duration-1000 opacity-100 flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            )}
            <p className="text-2xl text-green-700">¡Orden preparada con éxito!</p>
        </div>
    );
}
