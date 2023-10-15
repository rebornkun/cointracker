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
// import { Img } from '@react-email/img';
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VercelInviteUserEmail = ({
  username = "zenorocha",
  userImage = `${baseUrl}/static/vercel-user.png`,
  invitedByUsername = "bukinoshita",
  companyEmail = "xtbmarketio@gamil.com",
  teamName = "My Project",
  teamImage = `${baseUrl}/static/vercel-team.png`,
  inviteLink = "https://vercel.com/teams/invite/foo",
  inviteFromIp = "204.13.186.218",
  inviteFromLocation = "São Paulo, Brazil",
}) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Section className="mt-[32px]">
            <Img
              src={`${baseUrl}/assets/img/blue_tracker.png`}
              width="160"
              height="40"
              alt="Vercel"
              className="my-0 mx-auto"
            />
          </Section>
          <Container className="border border-solid border-[#eaeaea] rounded my-[20px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              1 new transaction detetcted
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              we have detected 1 new transaction in your wallets and
              exchanges...
            </Text>
            <ul>
              <li>
                <Text style={paragraph}>
                  {" "}
                  Recieved 1.96BTC in BTC Wallet ...sfdfsefesfsefsef
                </Text>
              </li>
            </ul>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={18}
                className="bg-[#0182ff] rounded text-[#fff] text-[16px] font-semibold no-underline text-center"
                href={inviteLink}
              >
                Connect wallets & exchanges
              </Button>
            </Section>
            <Section className="w-full text-start mb-[32px] p-0">
              <Text className="text-black text-[14px] leading-[24px]">
                <span className="text-[#666666]">For enquiries contact:</span>
                <br></br>
                <Link
                  href={`mailto:${"companyEmail"}`}
                  className="text-blue-600 no-underline"
                >
                  {companyEmail}
                </Link>{" "}
                Thanks. <br></br>
                The CoinTracker Team.
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
          <Section className="w-full flex flex-row justify-center items-center mb-[32px] gap-4">
            <Row>
              <Img
                src={`${baseUrl}/assets/img/x.png`}
                width="30"
                height="30"
                alt="x"
                className="my-0 mx-auto"
              />
              <Img
                src={`${baseUrl}/assets/img/youtube.png`}
                width="30"
                height="30"
                alt="youtube"
                className="my-0 mx-auto"
              />
            </Row>
          </Section>
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
