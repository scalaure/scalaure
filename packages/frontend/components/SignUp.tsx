import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, ref } from 'yup';
import { Alert } from './shared/Alert';
import { FormControl } from './shared/FormControl';
import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';
import { useUserContext } from 'contexts/UserCtx';

export type FormValues = InferType<typeof registerFormSchema>;

const registerFormSchema = object({
  fullName: string().required('Full name is required').min(3, 'Name is too short'),
  email: string().required('Email is required').email('Invalid email address'),
  password: string().required('Password is required').min(6, 'Password is too short').max(16, 'Password is too long'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password')
});

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<FormValues>({ resolver: yupResolver(registerFormSchema), reValidateMode: 'onSubmit' });
  const { setUser } = useUserContext();

  const onSubmit: SubmitHandler<FormValues> = data => {
    setUser({ email: data.email, fullName: data.fullName });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
    reset();
  };

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto text-center'>
        {showAlert && <Alert variant='success' msg='Account created!' className='mb-6' />}
        <h1 className='text-2xl font-bold sm:text-3xl'>Sign up</h1>
      </div>

      <form className='max-w-md mx-auto mt-8 mb-0 space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='fullName' placeholder='Full Name' register={register} errors={errors} />
        <FormControl id='email' placeholder='Email' type='email' register={register} errors={errors}>
          <span className='absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 right-4'>
            <svg
              className='w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
              />
            </svg>
          </span>
        </FormControl>
        <FormControl
          id='password'
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          register={register}
          errors={errors}
        >
          <button
            className='absolute text-gray-500 -translate-y-1/2 top-1/2 right-4 z-10'
            onClick={() => setShowPassword(prev => !prev)}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </button>
        </FormControl>
        <FormControl
          id='confirmPassword'
          placeholder='Confirm password'
          type={showConfirmPassword ? 'text' : 'password'}
          register={register}
          errors={errors}
        >
          <button
            className='absolute text-gray-500 -translate-y-1/2 top-1/2 right-4'
            onClick={() => setShowConfirmPassword(prev => !prev)}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </button>
        </FormControl>
        <div className='sm:flex items-center justify-between'>
          <Link href='/login'>
            <a className='underline block mb-3 sm:inline'>Already have an account? Sign in!</a>
          </Link>
          <button
            type='submit'
            className='block w-full sm:w-auto sm:inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
