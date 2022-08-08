import { SIGN_IN_PATH, SIGN_UP_PATH } from 'constants/paths';
import { Link } from 'components/shared/Link';
import { SRInput } from 'components/shared/SrInput';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';
import logo from '../../public/scalaure.png';

export const Header = () => {
  return (
    <header className='flex p-4 items-center gap-4'>
      <div className='w-72 mx-4'>
        <Image src={logo} alt='Scalaure' />
      </div>
      <SRInput
        id='courses'
        placeholder='Search courses'
        icon={<AiOutlineSearch className='w-5 h-5' />}
        wrapperClass='w-full'
        inputClass='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
      />
      <Link href={SIGN_IN_PATH} className='px-8 hidden sm:block'>
        LOGIN
      </Link>
      <Link href={SIGN_UP_PATH} className='px-8 hidden sm:block'>
        REGISTER
      </Link>
    </header>
  );
};
