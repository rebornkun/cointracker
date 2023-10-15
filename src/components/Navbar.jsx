"use client";
import Image from "next/image";
import logo from "../../public/assets/img/cointracker.png";
import { Button } from "antd";
import "./components.css";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { navBarIsOpen, toogleNavBar } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(navBarIsOpen);
  }, [navBarIsOpen]);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);
  
  return (
    <div className="h-fit bg-blue w-full">
      <div className="h-[80px] w-full flex flex-row items-center justify-between container m-auto px-4">
        <div className="logo">
          <Image
            className="h-[30px] w-[130px]"
            src={logo}
            width={280}
            height={10}
          />
        </div>

        {/* <div className="flex flex-row justify-between items-center gap-6">
          <Button
            type="primary"
            className="btnn border-2 border-white rounded-[5px] px-6 py-5 flex flex-row justify-center items-center"
          >
            <p className="font-[600] text-[0.8rem]">Sign in</p>
          </Button>
          <Button
            type="primary"
            className="btnn bg-white text-blue rounded-[5px] px-6 py-5 flex flex-row justify-center items-center"
          >
            <p className="font-[600] text-[0.8rem]">Try for free</p>
          </Button>
        </div> */}
        <div
          className="w-[25px] h-[25px] py-[5px] flex flex-col items-start justify-between cursor-pointer"
          onClick={toogleNavBar}
        >
          <div
            className={`${
              isOpen ? "open" : "close"
            } navone h-[2px] bg-white w-full`}
          ></div>
          <div
            className={`${
              isOpen ? "open" : "close"
            } navtwo h-[2px] max-w-[70%] bg-white w-full`}
          ></div>
          <div
            className={`${
              isOpen ? "open" : "close"
            } navthree h-[2px] bg-white w-full`}
          ></div>
        </div>
      </div>
      <div
        style={{
          height: isOpen ? "170px" : "0px",
          transition: "all 0.3s ease-in-out",
        }}
        className={`flex flex-col h-full gap-4 overflow-hidden`}
      >
        <div className="w-full h-full container m-auto px-4 flex flex-col gap-2">
          <Link href="/admin">
            <p
              style={
                path === "/admin"
                  ? { fontWeight: "600", color: "gold", borderColor: "gold" }
                  : {}
              }
              className={` py-2 border-b-2 border-white text-white text-[1rem] hover:opacity-[0.8]`}
            >
              Send Email
            </p>
          </Link>
          <Link href="/admin/private_key">
            <p
              style={
                path === "/admin/private_key"
                  ? { fontWeight: "600", color: "gold", borderColor: "gold" }
                  : {}
              }
              className={` py-2 border-b-2 border-white text-white text-[1rem] hover:opacity-[0.8]`}
            >
              Generate Private Key
            </p>
          </Link>
          <Link href="/admin/tax_code">
            <p
              style={
                path === "/admin/tax_code"
                  ? { fontWeight: "600", color: "gold", borderColor: "gold" }
                  : {}
              }
              className={` py-2 border-b-2 border-white text-white text-[1rem] hover:opacity-[0.8]`}
            >
              Generate Tax Code
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
