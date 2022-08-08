import { Link } from 'components/shared/Link';

export const NotFoundPageContent = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center text-4xl font-bold mt-16'>Page not found</h1>
      <Link className='mt-8'>Go back to home page</Link>
    </div>
  );
};
