"use client";

import { Button, Form, Input } from "antd";
import { useState } from "react";
// import MyTemplate from "@/emails/email";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { useAppContext } from "../../context/AppContext";
import Notification from "../../components/Notification";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const { createTransaction } = useAppContext();

  const generateTransactionId = () => {
    return "u" + new Date().getTime();
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    const txn_id = generateTransactionId();
    const createTransactionRes = await createTransaction(values, txn_id);
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txn_id: txn_id,
        email: values?.email,
        wallet: values?.wallet,
        coin_type: values?.coin_type,
        coin_value: values?.coin_value,
        coin_value_money: values?.coin_value_money,
      }),
    });

    if (res.status === 200) {
      Notification.displayInfo({
        message: "Success",
        description: "Email Sent",
      });
    } else {
      Notification.displayInfo({
        message: "Error",
        description: statusText,
      });
    }
    console.log(res);

    setIsLoading(false);
  };

  return (
    <div className="flex-auto w-full flex flex-col container mx-auto p-4 justify-center items-center">
      <div className="bg-white border-[1px] border-grey max-w-[500px] w-full min-h-[300px] h-fit rounded-[15px] shadow p-4">
        <h1 className="text-[1.5rem] text-black font-bold mb-2">Send Mail</h1>
        <Form
          name="Form"
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
              className="w-full bg-black text-white hover:!bg-black"
            >
              Send Mail
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
