import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, error: signInError, isAuthenticated } = useAuth();

  const [state, setState] = useState(false);

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });
  const navigate = useNavigate();

  useEffect(() => {
    setState(true);
    if (isAuthenticated && state === true && signInError.length === 0) {
      navigate('/');
    }
  }, [isAuthenticated, signInError]);

  return (
    <div className='flex flex-col items-center justify-center flex-1 w-4/5 min-h-screen mx-auto lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='w-auto h-10 mx-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='w-full mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        {signInError.map((error, i) => (
          <div
            key={i}
            className='p-2 my-2 text-center text-white bg-red-500 rounded-md'
          >
            {error}
          </div>
        ))}
        <form className='space-y-6' method='POST' onSubmit={onSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                {...register('email', { required: true })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3'
              />
            </div>
            {errors.email && <p className='text-red-500'>Email is required</p>}
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              {/* <div className='text-sm'>
                <a
                  href='#'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                {...register('password', { required: true })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3'
              />
            </div>
            {errors.password && (
              <p className='text-red-500'>Password is required</p>
            )}
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>

        <p className='mt-10 text-sm text-center text-gray-500'>
          No tienes cuenta? {''}
          <Link
            to='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Registrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
