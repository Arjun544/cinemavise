import React from "react";

const SocialButton = ({ img, text, onPressed }) => {
  return (
    <div onClick={onPressed} className="flex items-center h-12 px-6 ml-6 border-2 rounded-2xl cursor-pointer transform hover:scale-90 transition duration-500 ease-in-out">
      <span className="font-semibold text-sm text-black tracking-wider">{text}</span>
      <img className="h-3 pl-3" src={img} alt="" />
    </div>
  );
};

export default SocialButton;
