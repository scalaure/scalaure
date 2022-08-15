import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes, HTMLInputTypeAttribute } from 'react';
import type { FieldError } from 'react-hook-form';
import type { IconType } from 'react-icons';

type Props = {
  readonly error?: FieldError;
  readonly icon?: IconType;
  readonly toggledIcon?: IconType;
  readonly toggledtype?: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

const iconStyles = { height: '1.5rem', width: '1.5rem' };

export const FormControl = forwardRef<HTMLInputElement, Props>(
  ({ error, icon: Icon, toggledIcon: ToggledIcon, toggledtype, type, ...rest }, ref) => {
    const [toggled, setToggled] = useState(false);

    return (
      <>
        <div className='relative'>
          <label className='sr-only' htmlFor={rest.id}>
            {rest.placeholder}
          </label>

          <input
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            ref={ref}
            type={toggledtype && toggled ? toggledtype : type}
            {...rest}
          />

          {Icon && (
            <span
              className={clsx(
                'absolute text-gray-500 -translate-y-1/2 top-1/2 right-4',
                ToggledIcon ? 'cursor-pointer' : 'pointer-events-none'
              )}
              onClick={() => setToggled(prev => !prev)}
            >
              {toggled && ToggledIcon ? <ToggledIcon style={iconStyles} /> : <Icon style={iconStyles} />}
            </span>
          )}
        </div>

        {error && <p className='text-red-800'>{error.message}</p>}
      </>
    );
  }
);

FormControl.displayName = 'FormControl';
