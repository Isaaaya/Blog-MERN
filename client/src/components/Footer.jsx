import React from "react";
import { BiSolidHeartCircle } from "react-icons/bi";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-secondary text-textLight mt-[-2px] flex py-[60px] flex-col">
      <div className="w-[80%] mx-auto flex gap-6 max-md:flex-col-reverse">
        <div className="flex flex-col gap-4 max-md:items-center">
          <p className="text-white text-4xl font-semibold">ehya</p>
          <p>Build a modern and creative website with moonfo</p>
          <div className="flex gap-2">
            {[...Array(5)].map((item, index) => (
              <div
                key={index}
                className="w-[20px] h-[20px] max-md:w-[30px] max-md:h-[30px] rounded-full bg-[#FC5A5A]"
              ></div>
            ))}
          </div>
        </div>
        <div className="w-[70%] mx-auto grid max-lg:grid-cols-2 grid-cols-4 text-sm gap-6">
          {footerLinks.map((link, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <p className="font-bold text-lg">{link.groupTitle}</p>
              {link.groupItems.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-[50px] py-[30px] gap-4">
        <BiSolidHeartCircle size={50} className="text-primary" />
        <p>Copyright © 2023. Crafted with love.</p>
      </div>
    </footer>
  );
};

export default Footer;
