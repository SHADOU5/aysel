// app/login/page.tsx

'use client';

import { useState } from 'react'; // <-- Agregado para controlar el cambio de pestañas
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema, LoginFormValues } from '@/validations/auth.validations';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();
  
  // Estado para controlar qué rol está seleccionado ('vendedor' o 'administrador')
  const [role, setRole] = useState<'vendedor' | 'administrador'>('vendedor');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    // Si necesitas enviarle el rol al backend, puedes combinarlo aquí sin alterar el esquema
    const payload = { ...data, rol: role };
    
    const response = await login(payload);
    if (response) {
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        
        {/* LOGO REDONDO */}
        <div className="w-24 h-24 mb-4">
          <img 
            src="/aysel.jpeg" 
            alt="Logo Aysel Detalles" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* TÍTULO Y SUBTÍTULO */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Tienda Aysel
        </h1>
        <p className="text-xs text-gray-500 mb-6 text-center">
          Sistema de Facturación e Inventario
        </p>

        {/* PESTAÑAS INTERACTIVAS VENDEDOR / ADMINISTRADOR */}
        <div className="w-full flex border-b border-gray-200 mb-6 text-sm font-semibold">
          <button 
            type="button" 
            onClick={() => setRole('vendedor')}
            className={`w-1/2 pb-2 flex flex-col items-center gap-1 transition-all ${
              role === 'vendedor' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 opacity-70 border-b-2 border-transparent'
            }`}
          >
            <span className="text-base">🏪</span>
            VENDEDOR
          </button>
          
          <button 
            type="button" 
            onClick={() => setRole('administrador')}
            className={`w-1/2 pb-2 flex flex-col items-center gap-1 transition-all ${
              role === 'administrador' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 opacity-70 border-b-2 border-transparent'
            }`}
          >
            <span className="text-base">📦</span>
            ADMINISTRADOR
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          
          {/* Correo */}
          <div>
            <input
              type="text"
              {...register('correo')}
              placeholder="Correo electrónico *"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <input
              type="password"
              {...register('contrasena')}
              placeholder="Contraseña *"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {errors.contrasena && (
              <p className="text-red-500 text-xs mt-1">{errors.contrasena.message}</p>
            )}
          </div>

          {/* Error del servidor */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Botón con Degradado */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors text-sm uppercase tracking-wider shadow-sm mt-2"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </main>
  );
}
