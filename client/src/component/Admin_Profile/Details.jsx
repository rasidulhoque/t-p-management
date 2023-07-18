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
            <p className="text-2xl text-center">Most Recent tag_line</p>
            <div className="font-bold h-6 mt-1 text-gray-500 text-xs leading-8 uppercase">
              Highest Qualification
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["high_qualification"] || ""}
                name="high_qualification"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
          <div className="px-1 mx-2 flex-1">
            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
              Joining year
            </div>
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["joining_date"] || ""}
                name="joining_date"
                type="text"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          </div>
        </div>
        <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Phone Number
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["ph_no"] || ""}
                name="ph_no"
                type="number"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Email
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["email"] || ""}
                name="email"
                placeholder="email"
                type="text"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Linkedin ID
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["linkedin_id"] || ""}
                name="linkedin_id"
                type="text"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
      </div>
    </>
  );
}
export default Details
