import { StepperContext, UsernameContext } from "../StudentProfile/contexts/StepperContext";
import axios from "axios";
import { useEffect, useState } from "react";

import React, { useContext } from 'react'
const Account = () => {
    const { userData, setUserData } = useContext(StepperContext);
  const {username, setUsername}= useContext(UsernameContext);

    const [userDetails, setUserDetails]= useState({});
    console.log(userDetails);
    useEffect(()=>{
    //   axios
    //   .get(`http://localhost:4000/auth/get_field_from_Admin_details/${username}`,{...userData})
    //   .then((response)=>{
    //     setUserDetails(response.data);
    //   })
    //   .catch((error)=>{
    //     console.log(error);
    //   });
      console.log(username,"romkit");
    },[username]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
    return (
          <div className="flex flex-col ">
        
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Username
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <p className="w-full appearance-none p-1 px-2 text-gray-800 outline-none cursor-not-allowed">{username}</p>
            </div>
          </div>
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Password
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["password"] || ""}
                name="password"
                placeholder="Password"
                type="password"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
         
  
        
  
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Name
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["name"] || ""}
                name="name"
                type="text"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
  
        
  
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Designation
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-12">
              <input
                onChange={handleChange}
                value={userData["designation"] || ""}
                name="designation"
                type="text"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
  
          <div className="mx-2 w-full flex-1">
            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
             Employee Id
            </div>
            <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
              <input
                onChange={handleChange}
                value={userData["employee_id"] || ""}
                name="employee_id"
                type="url"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      )}
  
  

export default Account
