import { handleKeyDown } from "@/utils/CommonInputValidation";
import React from "react";

const CustomInput = ({ id, label, register, error, ...rest }: any) => {
  return (
    <div>
      <div className="relative ">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          id={id}
          onKeyDown={handleKeyDown}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register}
        />
        {error && <p className="text-red-500 text-xs pt-2">{error?.message}</p>}
      </div>
    </div>
  );
};

export default CustomInput;
