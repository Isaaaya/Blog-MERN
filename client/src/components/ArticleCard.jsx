import React from "react";
import ArticleImage from "../assets/posts/post1.jpg";
import ArticleProfileImage from "../assets/posts/post-profile.svg";
import { MdVerified } from "react-icons/md";

const ArticleCard = () => {
  return (
    <div className="flex flex-col w-[310px] rounded-xl shadow-lg text-textMain max-md:w-[330px]">
      <img
        className="w-[100%] object-cover"
        src={ArticleImage}
        alt="Article banner"
      />
      <div className="p-8 flex flex-col gap-5">
        <h3 className="text-3xl font-semibold">Future of Work</h3>
        <p className="text-lg">
          Majority of peole will work in jobs that don’t exist today.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-[50px] h-[50px]"
              src={ArticleProfileImage}
              alt="User"
            />
            <div>
              <p>Johanna Murray</p>
              <div className="flex items-center gap-[2px] ">
                <MdVerified size={20} className="text-green-600" />
                <p className="text-sm">Verified writer</p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 font-semibold">2 May</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
