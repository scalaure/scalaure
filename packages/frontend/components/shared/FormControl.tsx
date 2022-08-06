import { ErrorMsg } from './ErrorMsg';
import type { FormValues } from 'components/SignUp';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { Children } from 'types/types';

interface Props extends Children {
  readonly errors: FieldErrors<FormValues>;
  readonly id: keyof FormValues;
  readonly placeholder: string;
  readonly register: UseFormRegister<FormValues>;
  readonly type?: string;
}

export const FormControl = ({ children, errors, id, placeholder, register, type = 'text' }: Props) => {
  return (
    <>
      <div className='relative'>
        <label className='sr-only' htmlFor={id}>
          {placeholder}
        </label>

        <input
          className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id)}
        />
        {children}
      </div>
      {errors[id] && <ErrorMsg msg={errors[id]?.message} />}
    </>
  );
};
