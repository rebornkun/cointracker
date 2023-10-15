import { VercelInviteUserEmail } from "../../../emails/email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import nodemailer from "nodemailer";

const resend = new Resend("re_YMtbz1Jg_A2f1Q36qvJNAwQZ8xLSLbcKr");

export async function POST(req, res) {
  console.log(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: "Hello <hello@transfergo.cc>",
      to: "oluyohokiemute@gmail.com",
      subject: "Hello world",
      react: <VercelInviteUserEmail />,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
