import { BiSolidInvader } from 'react-icons/bi';

const LoadingIcon = ({ fillColor = 'lime' }) => (
  <div className='flex items-center justify-center p-4'>
    <BiSolidInvader fill={fillColor} className='animate-spin text-4xl' />
  </div>
);

export default LoadingIcon;
