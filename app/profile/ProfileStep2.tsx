"use client";

import Form from "next/form";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCard } from "../actions/create-card";
// import CompleteProfile from "./CompleteProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { getCountries } from "@/utils/getCountries";
import { ZodErrors } from "./ZodError";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: {
    country: [],
    firstname: [],
    lastname: [],
    cardNumber: [],
    expiryDate: [],
    cvc: [],
  },
};

export default function NewCard({ previousStep }: ProfileStepProps) {
  const [formState, formAction] = useActionState(createCard, INITIAL_STATE);

  const [value, setValue] = useState("");

  const handleSubmit = () => {
    previousStep();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setValue(onlyNumbers);
  };

  const { countries, months, years } = getCountries();

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form action={formAction} className="space-y-6">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="country" className="w-127">
            Select country
          </Label>
          <Select name="country">
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ZodErrors error={formState?.ZodError?.countries} />
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your name here"
            />
            <ZodErrors error={formState?.ZodError?.firstName} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your name here"
            />
            <ZodErrors error={formState?.ZodError?.lastName} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cardNumber">Enter card number</Label>
          <Input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={value}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          <ZodErrors error={formState?.ZodError?.cardNumber} />
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Expires</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ZodErrors error={formState?.ZodError?.months} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Year</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ZodErrors error={formState?.ZodError?.years} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input type="text" id="cvc" name="cvc" placeholder="CVC" />
            <ZodErrors error={formState?.ZodError?.cvc} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleSubmit}>Back</Button>
          <Button type="submit" />
          {/* <CompleteProfile /> */}
        </div>
      </Form>
    </div>
  );
}
