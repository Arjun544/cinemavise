import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ color = "bg-amber-400", text, onPressed }) => {
  return (
    <Link to={onPressed}>
      <div
        className={`flex items-center h-10 px-6 ${color} rounded-2xl cursor-pointer transform hover:scale-95 transition duration-500 ease-in-out`}
      >
        <span className="font-semibold text-sm text-black tracking-wider">
          {text}
        </span>
      </div>
    </Link>
  );
};

export default CustomButton;
