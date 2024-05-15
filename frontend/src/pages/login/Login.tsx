import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LoginContainer, LoginContent, LoginFooter, LoginHeader } from '../../components/styled/login';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../services/authApi';
import { removeToken, setToken } from '../../helpers/jwt';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { signin, signout } from '../../slices/authSlice';
import Locale from '../../components/locale/Locale';

function Login() {
  const { t } = useTranslation(['translation']);

  const navigate = useNavigate();
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
        navigate('/home');
      })
      .catch(() => {
        removeToken();
        dispatch(signout());
        setError(() => 'Identifiants erronés');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
