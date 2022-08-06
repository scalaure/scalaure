import clsx from 'clsx';

interface Props {
  readonly className?: string;
  readonly msg: string;
  readonly variant?: 'warning' | 'success';
}

export const Alert = ({ className, msg, variant = 'warning' }: Props) => {
  const classes = clsx(
    'p-4 border rounded',
    variant === 'warning' && 'text-amber-700 bg-amber-50 border-amber-900/10',
    variant === 'success' && 'text-green-700 border-green-900/10 bg-green-50',
    className
  );

  return (
    <div className={classes}>
      <strong className='text-sm font-medium'>{msg}</strong>
    </div>
  );
};
