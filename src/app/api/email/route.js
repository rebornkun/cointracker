import { VercelInviteUserEmail } from "../../../emails/email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_dLLRBJAD_6tVpGrGup4WiuVPHvdNt6kWe");

export async function POST(request) {
  const req = await request.json();
  try {
    const data = await resend.emails.send({
      // from: `Cointracker <${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}>`,
      from: `Cointracker <cointracker@resend.dev>`,
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
