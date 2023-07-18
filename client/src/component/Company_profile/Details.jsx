import { StepperContext } from "../StudentProfile/contexts/StepperContext";

import React, { useState, useContext } from 'react'

const Details = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [fields, setFields] = useState([{ value: null }]);
  console.log(userData,"tttttt");
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <div className="mx-auto rounded-2xl bg-white pb-2 shadow-2xl md:w-full">
        <div className="flex flex-col ">
          <div className="px-1 mx-2 flex-1">
            <p className="text-2xl text-center">Basic Details</p>
            <div className="font-bold h-6 mt-1 text-gray-500 text-xs leading-8 uppercase">
              Chairman
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["chairman"] || ""}
                name="chairman"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
          <div className="px-1 mx-2 flex-1">
            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
              Establish
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["est"] || ""}
                name="est"
                type="text"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="px-1 mx-2 flex-1">
            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
              Tag Line
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["tag_line"] || ""}
                name="tag_line"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
          <div className="px-1 mx-2 flex-1">
            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
             Industry
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["industry"] || ""}
                name="industry"
                type="text"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
              Headquarter
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["headquarter"] || ""}
                name="headquarter"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}
export default Details
