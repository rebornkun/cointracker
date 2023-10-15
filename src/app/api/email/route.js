// import MyTemplate from "@/emails/email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import nodemailer from "nodemailer";

const resend = new Resend("re_YMtbz1Jg_A2f1Q36qvJNAwQZ8xLSLbcKr");

export async function GET(req, res) {
  console.log(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "delivered@resend.dev",
      subject: "Hello world",
      text: "hello",
    });

    return NextResponse.json({ data });
    // res.status(200).json(data);
  } catch (error) {
    return NextResponse.json({ status: 400 });
    // res.status(400).json(error);
  }
}
