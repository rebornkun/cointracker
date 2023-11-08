"use client";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useAppContext } from "../context/AppContext";

const Loader = () => {
  const [count, setCount] = useState(0);
  const { finishStep } = useAppContext();

  useEffect(() => {
    if (count < 100) {
      setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 100);
    } else {
      finishStep()
    }
  }, [count]);
  return (
    <div className="container px-4 mx-auto mt-12 flex-auto flex flex-col items-center gap-6 w-full sm:max-w-[400px]">
      <h1 className="text-[1.5rem] font-[600]">Authenticating</h1>
      <div className="relative w-full h-[46px] flex flex-row justify-start">
        <div style={{ width: `${count}%` }} className="bg-[#0617ac;]"></div>
        <p className=" top-[10px] left-4 absolute mt-[0.1rem] text-white text-[0.8rem] text-light italic">
           {count}%
        </p>
      </div>
      
      {/* {count === 100 &&
        <>
          <p className="mt-[0.1rem] text-green text-[0.8rem] text-bold">
            Done!
          </p>
          <Button
            // loading={isLoading}
            onClick={finishStep}
            type="primary"
            htmlType="submit"
            className="w-full pro py-4 bg-blue text-white !text-[0.8rem]"
          >
            Click Here to Proceed
          </Button>
        </>
      } */}
    </div>
  );
};

export default Loader;
