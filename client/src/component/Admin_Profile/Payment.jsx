// import { StepperContext } from "../StudentProfile/contexts/StepperContext";
// import { useState, useEffect , useContext } from "react";
// import React  from "react";

// const Payment = () => {
//   const { userData, setUserData } = useContext(StepperContext);
//   const [awardCount, setAwardCount] = useState(1);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };
  

//   return (
//     <>

//      <div className="flex flex-col ">
        
//         <div className="w-full mx-2 flex-1">
//           <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
//             Upload Profile Photo
//           </div>
//           <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
//             <input
//               onChange={handleChange}
//               value={userData["photo"] || ""}
//               name="photo"
//               type="file"
//               className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Payment;


import { StepperContext } from "../StudentProfile/contexts/StepperContext";
import { useState, useContext } from "react";
import React from "react";

const Payment = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setUserData({ ...userData, [name]: files[0] });
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Upload Profile Photo
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              onChange={handleChange}
              value=""
              name="photo"
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