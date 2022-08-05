import type { ReactNode } from 'react';

interface Props {
  readonly children?: ReactNode;
  readonly id: string;
  readonly placeholder: string;
  readonly type?: string;
}

export const FormControl = ({ children, id, placeholder, type = 'text' }: Props) => {
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
      />
      {children}
    </div>
  );
};
