"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import initialFormValues from "./initialFormValues";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const inputImageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewLink, setPreviewLink] = useState("");

  const updateFormErrors = (errors) => {
    setFormErrors((prev) => ({ ...prev, ...errors }));
  };

  const openBrowse = () => {
    inputImageRef.current?.click();
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewLink(URL.createObjectURL(file));
      setFormValues((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setPreviewLink(URL.createObjectURL(file));
      setFormValues((prev) => ({ ...prev, profileImage: file }));
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("formData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFormValues(parsed);
      if (parsed.step !== undefined) {
        setCurrentStep(parsed.step);
      }
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const addStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const StepComponent = [FirstStep, SecondStep][currentStep];

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#f3f4f6]">
      <AnimatePresence mode="wait">
        <StepComponent
          key={currentStep}
          addStep={addStep}
          previousStep={previousStep}
          handleInputChange={handleInputChange}
          formValues={formValues}
          inputImageRef={inputImageRef}
          previewLink={previewLink}
          openBrowse={openBrowse}
          formErrors={formErrors}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          isDragging={isDragging}
          updateFormErrors={updateFormErrors}
          handleFileInput={handleFileInput}
          currentStep={currentStep}
          setFormValues={setFormValues}
        />
      </AnimatePresence>
    </div>
  );
};

export default Page;
