import React from "react";
import { SignUp } from "../signup/page";

const HeaderComponents = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#FBBF24] flex flex-col justify-center items-center text-center px-8">
        <div className="text-white text-7xl mb-8">
          <img src="./illustration.png" />
        </div>
        <h1 className="text-2xl font-bold text-black">
          Fund your creative work
        </h1>
        <p className="text-black mt-2 text-sm">
          Accept support. Start a membership. Setup a shop. It's easier than you
          think.
        </p>
      </div>
      <div className="flex pl-120 pt-120">
        <SignUp />
      </div>
    </div>
  );
};

export default HeaderComponents;
