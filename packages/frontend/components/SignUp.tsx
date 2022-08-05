import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormControl } from './shared/FormControl';

export interface SignInData {
  readonly email: string;
  readonly fullName: string;
  readonly password: string;
  readonly passwordRepeat: string;
}

export const SignUp = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch
  } = useForm<SignInData>();

  const onSignIn = (data: SignInData) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto text-center'>
        <h1 className='text-2xl font-bold sm:text-3xl'>Get started today!</h1>

        <p className='mt-4 text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem,
          at itaque nostrum!
        </p>
      </div>

      <form className='max-w-md mx-auto mt-8 mb-0 space-y-4' onSubmit={handleSubmit(onSignIn)}>
        <FormControl
          id='fullName'
          placeholder='Full Name'
          register={register}
          options={{ required: 'Name is required', minLength: 5 }}
        />
        <FormControl
          id='email'
          placeholder='Email'
          type='email'
          register={register}
          options={{
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email is invalid'
            }
          }}
        >
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
          type='password'
          register={register}
          options={{
            required: 'You must specify a password',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters'
            }
          }}
        >
          <span className='absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 right-4'>
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
          </span>
        </FormControl>
        <FormControl
          id='passwordRepeat'
          placeholder='Confirm password'
          type='password'
          register={register}
          options={{ validate: value => (value !== watch('password') ? 'The passwords do not match' : true) }}
        >
          <span className='absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 right-4'>
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
          </span>
        </FormControl>

        <div className='flex items-center justify-between'>
          <Link href='/login'>
            <a className='underline'>Already have an account? Sign in!</a>
          </Link>

          <button
            type='submit'
            className='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
