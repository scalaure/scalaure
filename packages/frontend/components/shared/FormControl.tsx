import type { SignInData } from 'components/SignUp';
import type { ReactNode } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
  readonly children?: ReactNode;
  readonly id: keyof SignInData;
  readonly options: RegisterOptions;
  readonly placeholder: string;
  readonly register: UseFormRegister<SignInData>;
  readonly type?: string;
}

export const FormControl = ({ children, id, options, placeholder, register, type = 'text' }: Props) => {
  return (
    <div className='relative'>
      <label className='sr-only' htmlFor={id}>
        {placeholder}
      </label>

      <input
        className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, options)}
      />
      {children}
    </div>
  );
};
