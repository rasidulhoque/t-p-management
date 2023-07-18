import { StepperContext } from "../StudentProfile/contexts/StepperContext";
import { useState, useEffect , useContext } from "react";
import React  from "react";

const Payment = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [awardCount, setAwardCount] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddAward = () => {
    setAwardCount(awardCount + 1);
  };
  

  return (
    <>

     <div className="flex flex-col ">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Awards
          </div>
          {Array.from({ length: awardCount }).map((_, index) => (
            <div key={index} className="bg-white my-2 p-8 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData[`award-${index + 1}`] || ""}
                name={`award-${index + 1}`}
                type="text"
                placeholder={`award #${index + 1}`}
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full"
            onClick={handleAddAward}
          >
            Add More
          </button>
        </div>
        {/* <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Upload Company Logo
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              onChange={handleChange}
              value={userData["logo"] || ""}
              name="logo"
              type="file"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
        </div> */}
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Description of the Company
          </div>
          <div className="bg-white my-2 p-8 flex border border-gray-200 rounded">
            <input
              onChange={handleChange}
              value={userData["description"] || ""}
              name="description"
              type="text"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
