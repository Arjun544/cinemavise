import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import useOutsideClick from "../Hooks/useOutsideClick";

const SimpleDropDown = ({
  hint,
  items,
  selectedItem,
  setselectedItem,
}) => {
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
      ref={ref}
      onClick={toggleMenu}
      className={`flex relative h-12 w-52 mr-4 mb-3 md:mb-0 bg-slate-100 shadow-sm border-none px-4 rounded-xl hover:bg-slate-200 items-center justify-between cursor-pointer`}
    >
      <span className="text-sm text-black">
        {selectedItem === "" ? hint : selectedItem}
      </span>

      <RiArrowDropDownLine fontSize={25} fill="#000"></RiArrowDropDownLine>
      {isOpen && (
        <div
          className={`absolute z-50 top-14 left-0 right-1 max-h-96 w-52 flex flex-col py-4 px-2 rounded-2xl shadow bg-white overflow-y-scroll`}
        >
          {items.map((item, i) => (
            <span key={i} className="mb-1 pl-4 rounded-md text-sm py-1 text-black capitalize hover:bg-slate-400">
              <div onClick={(e) => handleSort(e, item)}>{item}</div>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleDropDown;