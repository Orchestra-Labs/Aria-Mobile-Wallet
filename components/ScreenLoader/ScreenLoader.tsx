'use dom';

import '@tailwind';

import { Loader } from '../Loader';

const ScreenLoader = () => {
  return (
    <div className="h-screen w-screen">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
