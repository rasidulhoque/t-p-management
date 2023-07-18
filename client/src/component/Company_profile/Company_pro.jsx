import React, { useContext } from "react";
import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import userData from "../StudentProfile/contexts/StepperContext"
import { StepperContext, UsernameContext } from "../StudentProfile/contexts/StepperContext";
import {
  UseContextProvider,
} from "../StudentProfile/contexts/StepperContext";
import axios from "axios";
import Account from "./Account";
import Details from "./Details";
import Payment from "./Payment";
import Final from "./Final";
import Nav_company from "../Nav/Nav_company";

export const Company_pro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData, setUserData } = useContext(StepperContext);
  const {username, setUsername}= useContext(UsernameContext);
  const steps = [
    "Basic Details",
    "About company",
    "picture upload",
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
      axios
        .put(`http://localhost:4000/auth/update_Company_profile/${username}`,{...userData})
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
      <Nav_company />
      <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10 ">
           {displayStep(currentStep)}
          </div>
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
