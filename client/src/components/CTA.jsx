import React from "react";
import CTAImage from "../assets/CtaImage.jpg";

const CTA = () => {
  return (
    <>
      <svg
        className="w-[100%] h-auto"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>
      <section className="bg-secondary text-white mt-[-2px]">
        <div className="lg:w-[80%] mx-auto flex max-lg:flex-col-reverse items-end max-lg:items-center py-[40px] justify-between gap-12">
          <div className="w-[65%] flex flex-col gap-5 max-lg:items-center max-lg:text-center">
            <h2 className="text-2xl font-semibold">
              Get our stories delivered From us to your inbox weekly.
            </h2>
            <div className="flex max-md:flex-col items-center gap-2">
              <input
                className="px-5 py-2 rounded-md"
                placeholder="Your Email"
              />
              <button className="bg-primary px-5 py-2 rounded-md w-fit">
                Get Started
              </button>
            </div>
            <p className="text-sm text-textLight">
              Get a response tomorrow if you submit by 9pm today. If we received
              after 9pm will get a reponse the following day.
            </p>
          </div>
          <div className="relative">
            <div className="border bg-white text-textMain w-[300px] rounded-xl p-[6px] z-20 relative">
              <img loading={"lazy"} src={CTAImage} alt="Messengers" />
              <div className="p-5 flex flex-col gap-2">
                <h5 className="text-xl font-bold">
                  The best articles every week
                </h5>
                <p className="text-textLight">
                  Our insurance plans offers are priced the same everywhere
                  else.
                </p>
              </div>
            </div>
            <div className="bg-[#1C3142] w-[200px] h-[150px] absolute bottom-[-30px] left-[-35px] rounded-xl z-10"></div>
            <div className="bg-[#FC5A5A] w-[200px] h-[200px] absolute top-[-30px] right-3 rounded-xl z-10"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
