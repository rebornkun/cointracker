// import * as React from "react";
// import { Html } from "@react-email/html";
// import { Button } from "@react-email/button";

// export function Email(props) {
//   const { url } = props;

//   return (
//     <Html lang="en">
//       <Button style={{ color: "red" }} href={url}>
//         Click me
//       </Button>
//     </Html>
//   );
// }

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = "https://www.cointracker.ws";
// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "d";

export const VercelInviteUserEmail = ({
  companyEmail = "inquire.cointracker@mail.com",
  companyAddress = `2093 Philadelphia Pike #2046, Claymont, DE 19703, USA`,
  txn_id = `U1234355`,
  inviteLink = `${baseUrl}`,
  coinType = "BTC",
  coinAmount = 1.96,
  walletAddress = "hewffejkfnksjsdjksdjfknJJusN455paPH",
}) => {
  const previewText = `you have a new transaction`;
  const fullInviteLink = `${inviteLink}?txn_id=${txn_id}`;

  const newMail = "inquire.cointracker@mail.com";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Section className="mt-[32px]">
            <Img
              src={`${baseUrl}/assets/img/cointrackerTwo.png`}
              width="160"
              // height="40"
              alt="Cointracker Logo"
              className="my-0 mx-auto"
            />
          </Section>
          <Container className="border border-solid border-[#eaeaea] rounded my-[20px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              1 new transaction detected
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              we have detected 1 new transaction in your wallets and
              exchanges...
            </Text>
            <ul>
              <li>
                <Text style={paragraph}>
                  {`Received ${coinAmount}${coinType} in ${coinType} Wallet ...${walletAddress.slice(
                    -12
                  )}`}
                </Text>
              </li>
            </ul>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={18}
                style={button}
                className="bg-[#000000] rounded text-[16px] font-semibold no-underline text-center"
                href={fullInviteLink}
              >
                Connect wallets & exchanges
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              <span className="text-[#666666]">For enquiries contact:</span>
              <br></br>
              <Link
                href={`mailto:${newMail}`}
                className="text-purple no-underline"
              >
                {newMail}
              </Link>{" "}
              Thanks. <br></br>
              The CoinTracker Team.
            </Text>
          </Container>
          <div className="mx-auto w-[100px] flex flex-row">
            {/* <Img
              src={`${baseUrl}/assets/img/x.png`}
              width="30"
              height="30"
              alt="x"
              className="my-0 mx-auto cursor-pointer"
            />
            <Img
              src={`${baseUrl}/assets/img/youtube.png`}
              width="30"
              height="30"
              alt="youtube"
              className="my-0 mx-auto cursor-pointer"
            /> */}
          </div>
          <Text className="text-black text-center text-[14px] leading-[24px] mx-auto">
            <span className="text-[#666666]">CoinTracker</span>
            <br></br>
            <Text className="text-[#666666] no-underline mx-auto text-[12px] text-center">
              {companyAddress}
            </Text>
          </Text>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <Text className="text-[#666666] text-center text-[12px] leading-[24px]">
            You're receiving this email because you have an account with
            CoinTracker.
            <br />
            <Link
              href={`${baseUrl}/unsubscribe?email=${companyEmail}`}
              className="text-[#666666] underline"
            >
              Unsubscribe from transaction notifications
            </Link>
          </Text>
          <Section></Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;

const paragraph = {
  fontSize: "16px",
  lineHeight: "21px",
  color: "#3c3f44",
};
const button = {
  color: "#fff",
};

// export function Email(props) {
//   const { url } = props;

//   return (
//     <Html lang="en">
//       <Button style={{ color: "red" }} href={url}>
//         Click me
//       </Button>
//     </Html>
//   );
// }

// export default Email;
