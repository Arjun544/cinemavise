import React from 'react';
import { RiMovie2Fill } from 'react-icons/ri';

const WidgetLoader = () => {
  return (
    <div className="flex w-screen h-full bg-white dark:bg-gray-800 items-center justify-center">
      <i>
        {
          <RiMovie2Fill
            className="animate-spin animate-ping my-10 fill-black dark:fill-white"
            fontSize={30}
          />
        }
      </i>
    </div>
  );
};

export default WidgetLoader;
