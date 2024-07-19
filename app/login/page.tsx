'use client';

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';
import api from '../utils/api';
import Cookies from 'js-cookie';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/token/', { username, password });
            const { access } = response.data;

            Cookies.set('accessToken', access, { expires: 1 });

            window.location.href = '/';

        } catch (err) {
            setError('Credenciales incorrectas');
        };
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <Image src="https://ya-go.mx/wp-content/uploads/2024/06/logo-ya-go.png" alt="Logo" width={100} height={100} />
                </div>
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Iniciar Sesión</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 w-full text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
