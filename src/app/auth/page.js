"use client";

import Image from "next/image";
import googlelogo from "../../../public/assets/img/google.png";
import { Button, Checkbox, Form, Input } from "antd";
import { auth, db } from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Notification from "../../components/Notification";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GoogleIcon = () => {
  return (
    <Image
      className="h-[25px] w-[25px]"
      src={googlelogo}
      width={280}
      height={10}
    />
  );
};
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UsersCollectionRef = collection(db, "Users");
  const router = useRouter();

  const onFinish = async (values) => {
    // console.log("Success:", values);

    setIsLoading(true);
    try {
      const auther = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (getAuth().currentUser != null) {
        // console.log(getAuth().currentUser);
        const { user } = auther;
        //check if user is new
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          await setDoc(doc(UsersCollectionRef, user.uid), {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            metadata: user.reloadUserInfo,
            isUserNew: true,
            private_keys: [],
            tax_codes: [],
            gas_codes: [],
          });
        }
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, uid: user.uid, isLoggedIn: true })
        );
        localStorage.setItem("isAdmin", JSON.stringify(true));
      }

      Notification.displayInfo({
        message: "Success",
        description: "Logged in",
      });
      router.replace("/admin", { scroll: false });
    } catch (error) {
      console.log(error);
      Notification.displayInfo({
        message: "Error",
        description: error.code || error.message,
      });
    }
    setIsLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login h-screen bg-white p-2 flex flex-col gap-10">
      <div className="mt-10 shadow flex flex-col justify-center items-center mx-auto max-w-[400px] h-fit w-full flex-auto py-4 px-8">
        <div className="logo flex flex-col items-center gap-2">
          <Image
            className="h-[30px] w-[130px]"
            src={
              "https://s3-us-west-1.amazonaws.com/coin-tracker-public/static/images/icons/logo_blue.svg"
            }
            width={280}
            height={10}
          />

          <h1 className="text-[1.5rem] text-black font-bold">Welcome Back</h1>
        </div>
        <Form
          name="login"
          className={"w-full flex flex-col gap-6"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <p className="">Email</p>
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
            <p className="">Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue text-white"
            >
              Sign in
            </Button>
          </Form.Item>

          <div className="flex flex-row gap-2">
            <p className="text-black text-light text-[0.8rem]">
              Don't have an account?
            </p>
            <p className="text-blue text-bold text-[0.8rem] cursor-pointer">
              Get started now
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="bg-grey h-[1px] flex-auto"></div>
            <p className="text-[0.8rem]">or</p>
            <div className="bg-grey h-[1px] flex-auto"></div>
          </div>

          <div>
            <Button
              // loading={isLoading}
              type=""
              htmlType=""
              className="w-full bg-white text-black flex flex-row justify-start gap-14 border-1 border-grey hover:bg-grey"
              icon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </div>
        </Form>
      </div>
      <div className="flex flex-row justify-center mb-4 text-center">
        <p className=" text-[0.8rem]">
          When you create a CoinTracker account, you<br></br>agree to the{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default page;
