"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export const FirstStep = ({
  addStep,
  handleInputChange,
  formValues,
  formErrors,
  updateFormErrors,
  currentStep,
}: any) => {
  const {
    Name = "",
    About = "",
    Social = "",
    profileImage = "",
  } = formValues || {};

  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(profileImage);

  const isEmpty = (value: string) => !value || value.trim() === "";

  const validateStepOne = () => {
    const validationErrors: any = {};

    if (isEmpty(Name)) {
      validationErrors.Name = "Нэрээ оруулна уу";
    }
    if (isEmpty(About)) {
      validationErrors.About = "Хэрэглэгчийн мэдээллээ оруулна уу";
    }
    if (isEmpty(Social)) {
      validationErrors.Social = "Соц хаягаа оруулна уу";
    }

    return {
      isFormValid: Object.keys(validationErrors).length === 0,
      validationErrors,
    };
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleInputChange({
          target: { name: "profileImage", value: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isFormValid, validationErrors } = validateStepOne();

    if (isFormValid) {
      addStep();
      localStorage.setItem(
        "formData",
        JSON.stringify({
          ...formValues,
          profileImage: image,
          step: currentStep + 1,
        })
      );
    } else {
      setErrors(validationErrors);
      updateFormErrors(validationErrors);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <form
        className="flex flex-col items-center justify-center w-[480px] min-h-[655px] bg-white rounded-lg py-8"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-semibold mb-6">
          Complete your profile page
        </h3>

        <div className="flex flex-col items-center space-y-4 mb-4">
          <label className="text-sm font-medium text-gray-700">Add photo</label>
          <div
            className="flex items-center justify-center rounded-full w-40 h-40 border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer overflow-hidden"
            onClick={handleImageClick}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Camera className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col items-start space-y-2 w-80 mb-2">
          <Input
            name="Name"
            type="text"
            placeholder="Enter your name here"
            value={Name}
            onChange={handleInputChange}
          />
          {errors.Name || formErrors.Name ? (
            <p className="text-sm text-red-500">
              {errors.Name || formErrors.Name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-start space-y-2 w-80 mb-2">
          <Input
            name="About"
            type="text"
            placeholder="Write about yourself here"
            value={About}
            onChange={handleInputChange}
            className="min-h-[80px]"
          />
          {errors.About || formErrors.About ? (
            <p className="text-sm text-red-500">
              {errors.About || formErrors.About}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-start space-y-2 w-80 mb-6">
          <Input
            name="Social"
            type="text"
            placeholder="https://"
            value={Social}
            onChange={handleInputChange}
          />
          {errors.Social || formErrors.Social ? (
            <p className="text-sm text-red-500">
              {errors.Social || formErrors.Social}
            </p>
          ) : null}
        </div>

        <Button className="w-[246px] bg-black text-white" type="submit">
          Continue
        </Button>
      </form>
    </motion.div>
  );
};
