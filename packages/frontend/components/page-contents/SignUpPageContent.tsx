import { SIGN_IN_PATH } from 'constants/paths';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'components/shared/Alert';
import { Button } from 'components/shared/Button';
import { FormControl } from 'components/shared/FormControl';
import { useCoolDown } from 'hooks/useCoolDown';
import Link from 'next/link';
import { useUser } from 'providers/UserProvider';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { object, string, ref } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';

const schema = object({
  fullName: string().required('Full name is required').min(3, 'Name is too short'),
  email: string().required('Email is required').email('Invalid email address'),
  password: string().required('Password is required').min(6, 'Password is too short').max(16, 'Password is too long'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password')
});

type FormValues = InferType<typeof schema>;

export const SignUpPageContent = () => {
  const [showAlert, setShowAlert] = useCoolDown(1500);

  const { setUser } = useUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<FormValues>({ resolver: yupResolver(schema), reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<FormValues> = ({ email, fullName }) => {
    setUser({ email, fullName });
    setShowAlert();
    reset();
  };

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto text-center'>
        {showAlert && <Alert variant='success' message='Account created!' className='mb-6' />}
        <h1 className='text-2xl font-bold sm:text-3xl'>Sign up</h1>
      </div>

      <form className='max-w-md mx-auto mt-8 mb-0 space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <FormControl id='fullName' placeholder='Full Name' error={errors.fullName} {...register('fullName')} />

        <FormControl
          id='email'
          placeholder='Email'
          type='email'
          error={errors.email}
          icon={MdAlternateEmail}
          {...register('email')}
        />

        <FormControl
          id='password'
          placeholder='Password'
          type='password'
          error={errors.password}
          icon={AiOutlineEye}
          toggledIcon={AiOutlineEyeInvisible}
          toggledtype='text'
          {...register('password')}
        />

        <FormControl
          id='confirmPassword'
          placeholder='Confirm password'
          type={'password'}
          error={errors.confirmPassword}
          icon={AiOutlineEye}
          toggledIcon={AiOutlineEyeInvisible}
          toggledtype='text'
          {...register('confirmPassword')}
        />

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
