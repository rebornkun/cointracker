"use client";
import { useEffect } from "react";
import { Resend } from "resend";
// import nodemailer from "nodemailer";

export default function Home() {
  const resend = new Resend("re_YMtbz1Jg_A2f1Q36qvJNAwQZ8xLSLbcKr");
  const sendEmail = async () => {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });
    console.log(res);
  };

  useEffect(() => {
    sendEmail();
    console.log("33");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
