import { ContextProvider } from "../context/AppContext";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Cointracker",
  description:
    "CoinTracker is the most trusted Bitcoin tax software and crypto portfolio manager. Automatically connect Coinbase, Binance, and all other exchanges & wallets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
