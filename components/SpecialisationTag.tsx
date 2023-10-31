import React from "react";

interface SpecialisationProps {
  specialisation: any;
}
const SpecialisationTag = ({ specialisation }: SpecialisationProps) => {
  return (
    <p className="flex px-2 py-1 m-2 text-sm bg-gray-100 rounded-md cursor-pointer font-inter h-min hover:bg-blue-500 hover:text-white">
      {specialisation?.name}
    </p>
  );
};

export default SpecialisationTag;
