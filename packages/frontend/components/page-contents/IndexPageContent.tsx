import { COURSES_PATH } from 'constants/paths';
import { Link } from 'components/shared/Link';

export const IndexPageContent = () => {
  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 text-center'>
      <h1 className='my-2 text-4xl font-bold'>Change your life with Scalaure</h1>
      <h2>Start learning new things completely online and learn new skills that will change your future!</h2>
      <Link className='mt-5' href={COURSES_PATH}>
        CHECK OUR COURSES
      </Link>
    </div>
  );
};
