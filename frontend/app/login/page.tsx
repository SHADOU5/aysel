
// app/login/page.tsx


'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema, LoginFormValues } from '@/validations/auth.validations';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    const response = await login(data);

    if (response) {
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Iniciar sesión
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Bienvenido al sistema
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Usuario o correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario o correo
            </label>

            <input
              type="text"
              {...register('correo')}
              placeholder="usuario o correo@ejemplo.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.correo.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>

            <input
              type="password"
              {...register('contrasena')}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            {errors.contrasena && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contrasena.message}
              </p>
            )}
          </div>

          {/* Error del servidor */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>

        </form>
      </div>
    </main>
  );
}