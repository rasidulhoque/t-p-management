import React, { useContext } from "react";
import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import userData from "../StudentProfile/contexts/StepperContext";
import {
  StepperContext,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
import { UseContextProvider } from "../StudentProfile/contexts/StepperContext";

import axios from "axios";
import Account from "./Account";
import Details from "./Details";
import Payment from "./Payment";
import Final from "./Final";
import Nav4 from "../Nav/Nav4";

export const Stu_pro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData, setUserData } = useContext(StepperContext);
  const { username, setUsername } = useContext(UsernameContext);
  console.log(username, "ppppppppppp");
  console.log(userData, "rrr");
  const steps = [
    "Basic Details",
    "Education Details and courses",
    "Skills, Projects & Extra-cirricular activities",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    if (currentStep === 3) {
      const formData = new FormData();
      formData.append("password", userData.password);
      formData.append("email", userData.email);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("college", userData.college);
      formData.append("department", userData.department);
      formData.append("batch", userData.batch);
      formData.append("ph_no", userData.ph_no);
      formData.append("address", userData.address);
      formData.append("medialinks", userData.medialinks);
      formData.append("institute", userData.institute);
      formData.append("sem", userData.sem);
      formData.append("marks", userData.marks);
      formData.append("marksheet", userData.marksheet);
      formData.append("prevInstitute", userData.prevInstitute);
      formData.append("prevDept", userData.prevDept);
      formData.append("prevDegree", userData.prevDegree);
      formData.append("prevMarks", userData.prevMarks);
      formData.append("prevReg_no", userData.prevReg_no);
      formData.append("prevMarksheet", userData.prevMarksheet);
      formData.append("cerInstitute", userData.cerInstitute);
      formData.append("cerCourseName", userData.cerCourseName);
      formData.append("cerDuration", userData.cerDuration);
      formData.append("cerMarks", userData.cerMarks);
      formData.append("cerReg_no", userData.cerReg_no);
      formData.append("cerCertificate", userData.cerCertificate);
      formData.append("resume", userData.resume);
      formData.append("achievement", userData.achievement);

      axios
        .put(`http://localhost:4000/update_stu_profile/${username}`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(currentStep);

    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <Nav4 />
      <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10 ">{displayStep(currentStep)}</div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </>
  );
};
