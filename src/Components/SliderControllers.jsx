import React from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const SliderControllers = ({ slider }) => {
  return (
    <div className="flex items-center ml-4 gap-3">
      <RiArrowLeftSLine
        onClick={() => slider?.current?.slickPrev()}
        fontSize={25}
        className="cursor-pointer rounded-lg fill-black dark:fill-white hover:bg-slate-300"
      />
      <RiArrowRightSLine
        onClick={() => slider?.current?.slickNext()}
        fontSize={25}
        className="cursor-pointer rounded-lg fill-black dark:fill-white hover:bg-slate-300"
      />
    </div>
  );
};

export default SliderControllers
