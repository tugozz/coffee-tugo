import React from "react";
import HeaderComponents from "../components/HeaderComponents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUp = () => {
  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Create Your Account</h1>
        <p className="text-[14px] text-[#71717A]">
          Choose a username for your page
        </p>
      </div>
      <div className="pl-6 pb-6 pr-6">
        <label className="flex items-start" htmlFor="">
          username
        </label>
        <Input name="username" type="text" placeholder="Enter username here" />
      </div>
      <Button className="flex h-[40] pl-6 pb-6 pr-6" onClick={} />
    </div>
  );
};
