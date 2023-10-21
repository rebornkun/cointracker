import { VercelInviteUserEmail } from "../../../emails/email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const req = await request.json();
  try {
    const data = await resend.emails.send({
      from: `${req?.txn_id} <${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}>`,
      to: req?.email,
      subject: "CoinTracker Transaction Notification",
      react: (
        <VercelInviteUserEmail
          txn_id={req?.txn_id}
          coinType={req?.coin_type}
          coinAmount={req?.coin_value}
          walletAddress={req?.wallet}
        />
      ),
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
