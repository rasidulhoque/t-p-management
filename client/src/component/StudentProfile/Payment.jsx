import { StepperContext } from "../StudentProfile/contexts/StepperContext";
import { useState, useEffect, useContext } from "react";
import React from "react";

const Payment = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [achievementsCount, setAchievementsCount] = useState(1);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setUserData({ ...userData, [name]: files[0] });
  };

  const handleAddAchievement = () => {
    setAchievementsCount(achievementsCount + 1);
  };

  return (
    <>
      <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Achievements
          </div>
          {Array.from({ length: achievementsCount }).map((_, index) => (
            <div
              key={index}
              className="bg-white my-2 p-8 flex border border-gray-200 rounded"
            >
              <input
                onChange={(e) => handleChange(e, index)}
                value={userData[`achievement-${index + 1}`] || ""}
                name={`achievement-${index + 1}`}
                type="text"
                placeholder={`Achievement #${index + 1}`}
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full"
            onClick={handleAddAchievement}
          >
            Add More
          </button>
        </div>
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Upload resume
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              onChange={handleChange}
              value=""
              name="resume"
              type="file"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
   