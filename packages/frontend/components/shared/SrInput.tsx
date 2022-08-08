import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface Props {
  id: string;
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  inputClass?: string;
  wrapperClass?: string;
  icon?: JSX.Element;
}

export const SRInput = ({ id, placeholder, type = 'text', inputClass, wrapperClass, icon }: Props) => {
  const classes = clsx(icon && 'relative', wrapperClass);

  return (
    <div className={classes}>
      <label className='sr-only' htmlFor={id}>
        {placeholder}
      </label>

      <input className={inputClass} id={id} type={type} placeholder={placeholder} />

      {icon && <span className='absolute -translate-y-1/2 pointer-events-none top-1/2 right-4'>{icon}</span>}
    </div>
  );
};
