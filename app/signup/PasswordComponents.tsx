"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PasswordComponents = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert(`Your password is: ${password}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        Set Your Password
      </h1>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-black dark:text-white"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full text-white bg-black hover:bg-gray-900"
      >
        Submit
      </Button>
    </div>
  );
};

export default PasswordComponents;
