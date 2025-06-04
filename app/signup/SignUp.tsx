"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const checkUsernameAvailability = async (username: string) => {
  await new Promise((res) => setTimeout(res, 500));
  return username !== "takenuser";
};

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  const router = useRouter();

  useEffect(() => {
    if (!username) {
      setStatus("idle");
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setStatus("checking");
      const available = await checkUsernameAvailability(username);
      setStatus(available ? "available" : "taken");
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  const isDisabled = !username || status === "checking" || status === "taken";

  const handleContinue = () => {
    if (!isDisabled) {
      router.push("/signup/PasswordComponents");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Create Your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a username for your page
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-black dark:text-white"
        >
          Username
        </label>
        <Input
          id="username"
          name="username"
          placeholder="Enter username here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {status === "checking" && (
          <p className="text-xs text-gray-500">Checking availability...</p>
        )}
        {status === "taken" && (
          <p className="text-xs text-red-500">Username is already taken.</p>
        )}
        {status === "available" && (
          <p className="text-xs text-green-500">Username is available!</p>
        )}
      </div>

      <Button
        disabled={isDisabled}
        onClick={handleContinue}
        className={`w-full text-white ${
          isDisabled
            ? "bg-[#d1d1d1] cursor-not-allowed"
            : "bg-black hover:bg-gray-900"
        }`}
      >
        Continue
      </Button>
    </div>
  );
};
