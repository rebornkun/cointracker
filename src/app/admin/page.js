"use client";

import { Button, Form, Input } from "antd";
import { useState } from "react";
// import MyTemplate from "@/emails/email";
import { Resend } from "resend";
import { render } from "@react-email/render";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  // const resend = new Resend("re_c2DVvNT7_5P1DEhRrgLQ2WjRguFjQRxzy");
  const resend = new Resend("re_YMtbz1Jg_A2f1Q36qvJNAwQZ8xLSLbcKr");

  // console.log(html);
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setIsLoading(true);
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    });

    setIsLoading(false);
  };

  return (
    <div className="flex-auto w-full flex flex-col container mx-auto px-4 justify-center items-center">
      <div className="bg-white border-[1px] border-grey max-w-[500px] w-full min-h-[300px] h-fit rounded-[15px] shadow p-4">
        <h1 className="text-[1.5rem] text-black font-bold mb-2">Send Mail</h1>
        <Form
          name="email"
          className={"w-full flex flex-col gap-4"}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <p className="font-bold text-[1rem]">Email</p>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>
          <div>
            <p className="font-bold text-[1rem]">Wallet Address</p>
            <Form.Item
              name="wallet"
              rules={[
                {
                  required: true,
                  message: "Please input wallet address",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>
          <div>
            <p className="font-bold text-[1rem]">Coin Type</p>
            <Form.Item
              name="coin_type"
              rules={[
                {
                  required: true,
                  message: "Please input Coin type",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>
          <div>
            <p className="font-bold text-[1rem]">Coin value</p>
            <Form.Item
              name="coin_value"
              rules={[
                {
                  required: true,
                  message: "Please input coin value",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>
          <div>
            <p className="font-bold text-[1rem]">Coin Value ($)</p>
            <Form.Item
              name="coin_value_money"
              rules={[
                {
                  required: true,
                  message: "Please input coin value in $",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue text-white"
            >
              Send Mail
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
