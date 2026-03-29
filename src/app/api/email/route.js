import { VercelInviteUserEmail } from "../../../emails/email";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
// import { Resend } from "resend";
import nodemailer from "nodemailer"; // added: nodemailer for Namecheap SMTP

// const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = new Resend("re_dLLRBJAD_6tVpGrGup4WiuVPHvdNt6kWe");

// added: Namecheap Private Email SMTP transporter
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NAMECHEAP_EMAIL,
    pass: process.env.NAMECHEAP_EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  const req = await request.json();
  try {
    const html = render(
      <VercelInviteUserEmail
        txn_id={req?.txn_id}
        coinType={req?.coin_type}
        coinAmount={req?.coin_value}
        walletAddress={req?.wallet}
      />,
    );

    // added: send via Namecheap SMTP using nodemailer
    const data = await transporter.sendMail({
      from: `Cointracker <${process.env.NAMECHEAP_EMAIL}>`,
      to: req?.email,
      subject: "CoinTracker Transaction Notification",
      html,
    });

    return NextResponse.json({ data });

    // removed: Brevo API call
    // const response = await fetch("https://api.brevo.com/v3/smtp/email", { ... });

    // removed: old Resend send call
    // const data = await resend.emails.send({
    //   from: `Cointracker <${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}>`,
    //   to: req?.email,
    //   subject: "CoinTracker Transaction Notification",
    //   react: (<VercelInviteUserEmail ... />),
    // });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
