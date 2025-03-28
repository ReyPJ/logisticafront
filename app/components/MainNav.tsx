'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        Cookies.remove('accessToken');
        router.push('/login');
    };

    const navItems = [
        { href: '/', label: 'Nuevos pedidos' },
        { href: '/preparados', label: 'Pedidos preparados' },
        { href: '/enviados', label: 'Pedidos enviados' },
        { href: '/guardados', label: 'Pedidos guardados' }
    ];

    return (
        <nav className='bg-white text-black shadow-md'>
            <div className='container flex justify-between items-center p-4'>
                <div className='hidden md:flex space-x-4'>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium 
                                ${pathname === item.href
                                    ? 'bg-red-600 text-white'
                                    : 'hover:bg-red-600 hover:text-white'
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                    <button onClick={handleLogout} className='ml-4 focus:outline-none'>
                        <FiLogOut size={24} className='text-red-600 hover:text-red-700' />
                    </button>
                </div>
                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMenu} className='focus:outline-none'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className='md:hidden bg-white overflow-hidden'>
                    <div className='flex flex-col py-4 space-y-4'>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className='px-3'>
                                <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium 
                                    ${pathname === item.href
                                        ? 'bg-red-600 text-white'
                                        : 'hover:bg-red-600 hover:text-white'
                                    }`}>
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                        <button onClick={handleLogout} className='px-3 py-2 rounded-md text-sm font-medium focus:outline-none'>
                            <FiLogOut size={24} className='text-red-600 hover:text-red-700 mx-auto' />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
