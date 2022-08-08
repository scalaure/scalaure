import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface Props {
  readonly icon?: JSX.Element;
  readonly id: string;
  readonly inputClass?: string;
  readonly placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  readonly type?: InputHTMLAttributes<HTMLInputElement>['type'];
  readonly wrapperClass?: string;
}

export const SRInput = ({ icon, id, inputClass, placeholder, type = 'text', wrapperClass }: Props) => {
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
