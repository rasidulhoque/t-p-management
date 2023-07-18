import {
  StepperContext,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
import axios from "axios";
import { useEffect, useState } from "react";

import React, { useContext } from "react";

const Account = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const { username, setUsername } = useContext(UsernameContext);

  const [userDetails, setUserDetails] = useState({});
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/auth/get_field_from_stu_details/${username}`,
        { ...userData }
      )
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/auth/get_departments")
      .then((response) => {
        const departments = response.data;
        setDepartments(departments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleDepartmentChange = (e) => {
    setUserData({ ...userData, department: e.target.value });
  };
  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Username
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <p className="w-full appearance-none p-1 px-2 text-gray-800 outline-none cursor-not-allowed">
            {username}
          </p>
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
            placeholder="Password*"
            type="password"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            required
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
          First Name
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1 cursor-not-allowed">
          <p className="w-full appearance-none p-1 px-2 text-gray-800 outline-none">
            {userDetails.firstName}
          </p>
        </div>
      </div>

      <div className="mx-2 w-full flex-1 ">
        <div className="mt-3 h-6 text-xs font-bold  uppercase leading-8 text-gray-500">
          Last Name
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1 cursor-not-allowed">
          <p className="w-full appearance-none p-1 px-2 text-gray-800 outline-none">
            {userDetails.lastName}
          </p>
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Date of Birth
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["dob"] || ""}
            name="dob"
            placeholder="Date of Birth"
            type="Date"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Gender
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["gender"] || ""}
            name="gender"
            placeholder="Gender"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

      {/* <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Current College
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["college"] || ""}
            name="college"
            placeholder="Current/ latest College"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div> */}

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Department
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <select
            onChange={handleDepartmentChange}
            value={userData["department"] || ""}
            name="department"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department.department} value={department.department}>
                {department.department}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Batch
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["batch"] || ""}
            name="batch"
            placeholder="2020-2023"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
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
          Address
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-12">
          <input
            onChange={handleChange}
            value={userData["address"] || ""}
            name="address"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

      {/* <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Social Media link and Account
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["medialinks"] || ""}
            name="medialinks"
            type="url"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Account;
