'use client';
import api from './utils/api'
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    api.get('/').then((response) => {
      console.log('Respuesta de la API:', response.data);
    });
  }, []);

  return (
    <div>
    </div>
  );
}
