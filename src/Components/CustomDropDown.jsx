import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import useOutsideClick from "../Hooks/useOutsideClick";

const CustomDropDown = ({ hint, items, selectedItem, setselectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };
  const handleSort = (e, item) => {
    e.preventDefault();
    setselectedItem(item);
  };

  return (
    <div
      onClick={toggleMenu}
      className={`flex relative h-12 w-52 mr-4 mb-3 md:mb-0 bg-slate-100 dark:bg-slate-600 shadow-sm border-none px-4 rounded-xl hover:bg-slate-100 items-center justify-between cursor-pointer`}
    >
      <span className="text-sm text-black dark:text-white tracking-wider">
        {Object.keys(selectedItem).length === 0 ? hint : selectedItem.name}
      </span>

      <RiArrowDropDownLine
        fontSize={25}
        className="fill-black dark:fill-white"
      ></RiArrowDropDownLine>
      {isOpen && (
        <div
          ref={ref}
          className={`absolute z-50 top-14 left-0 right-1 max-h-96 w-52  flex flex-col py-4 px-2 rounded-2xl shadow bg-white dark:bg-slate-600 overflow-y-scroll scrollbar scrollbar-thin hover:scrollbar-thumb-slate-400 scrollbar-thumb-slate-300 scrollbar-track-slate-200 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500`}
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="mb-1 pl-4 rounded-md text-sm py-1  text-black dark:text-white tracking-wider hover:bg-slate-400 hover:dark:bg-slate-500"
            >
              <div onClick={(e) => handleSort(e, item)}>{item.name}</div>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
