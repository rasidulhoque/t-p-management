import React, { useContext, useState } from "react";
import axios from "axios";
import Account from "./Account";
import Details from "./Details";
import Payment from "./Payment";
import Final from "./Final";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import Nav3 from "../Nav/Admin";
import {
  StepperContext,
  UsernameContext,
} from "../StudentProfile/contexts/StepperContext";
export const Admin_pro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useContext(StepperContext);
  const { username } = useContext(UsernameContext);
  const steps = [
    "Basic Details",
    "Education and Experience",
    "Picture uploads",
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
        return null;
    }
  };

  const handleClick = (direction, res) => {
    if (currentStep === 3) {
      const formData = new FormData();
      formData.append("password", userData.password);
      formData.append("email", userData.email);
      formData.append("name", userData.name);
      formData.append("employee_id", userData.employee_id);
      formData.append("designation", userData.designation);
      formData.append("joining_date", userData.joining_date);
      formData.append("ph_no", userData.ph_no);
      formData.append("high_qualification", userData.high_qualification);
      formData.append("linkedin_id", userData.linkedin_id);
      formData.append("photo", userData.photo);
      axios
        .put(`http://localhost:4000/update_Admin_profile/${username}`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <Nav3 />
      <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10">{displayStep(currentStep)}</div>
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
