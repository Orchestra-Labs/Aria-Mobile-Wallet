'use dom';

import '@tailwind';

import { Loader } from '../Loader';

const ScreenLoader = () => {
  return (
    <div className="h-full w-screen">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
