import React, { useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { removeToken, setToken } from '../../helpers/jwt';
import { useAppDispatch } from '../../hooks/hook';
import { signin, signout } from '../../slices/authSlice';

function Login() {
  const dispatch = useAppDispatch();

  const [record, setRecord] = useState<Record<string, string | undefined>>({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState<string>('');

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    setError(() => '');

    if (!record.email || !record.password) {
      setError(() => 'Entrez email et mot de passe');
      return;
    }

    await login(record)
      .unwrap()
      .then((response) => {
        setToken(response.access_token);
        dispatch(signin());
        window.location.replace('/home');
      })
      .catch(() => {
        removeToken();
        dispatch(signout());
        setError(() => 'Identifiants erronés');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="bg-white py-10 px-8 shadow sm:rounded-lg sm:px-10"
          style={{ background: 'linear-gradient(to bottom, #6bb5ce, #5e87c6, #493488)' }}
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-5">Login</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-black text-center">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(event) => setRecord({ ...record, email: event.target.value })}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-black text-center">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => setRecord({ ...record, password: event.target.value })}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleLogin();
                }}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-bold text-black bg-indigo-600 hover:bg-indigo-700"
                style={{ backgroundColor: '#6bb5ce' }}
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
