import { SIGN_IN_PATH } from 'constants/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useUserContext } from 'providers/UserCtx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { object, string, ref } from 'yup';
import { Alert } from './shared/Alert';
import { Button } from './shared/Button';
import { FormControl } from './shared/FormControl';
import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';

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
            <MdAlternateEmail style={{ height: '1.5rem', width: '1.5rem' }} />
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
            {showPassword ? (
              <AiOutlineEyeInvisible style={{ height: '1.5rem', width: '1.5rem' }} />
            ) : (
              <AiOutlineEye style={{ height: '1.5rem', width: '1.5rem' }} />
            )}
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
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible style={{ height: '1.5rem', width: '1.5rem' }} />
            ) : (
              <AiOutlineEye style={{ height: '1.5rem', width: '1.5rem' }} />
            )}
          </button>
        </FormControl>
        <div className='sm:flex items-center justify-between'>
          <Link href={SIGN_IN_PATH}>
            <a className='underline block mb-3 sm:inline'>Already have an account? Sign in!</a>
          </Link>

          <Button className='w-full' type='submit'>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
