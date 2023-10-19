import React from "react";
import ProfileImage from "../assets/posts/post-profile.svg";
import { BsReplyFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const ArticleComment = () => {
  const commentButtons = [
    {
      icon: <BsReplyFill />,
      title: "Reply",
    },
    {
      icon: <MdModeEditOutline />,
      title: "Edit",
    },
    {
      icon: <AiOutlineDelete />,
      title: "Delete",
    },
  ];

  return (
    <div className="flex flex-col gap-2 max-w-[800px] bg-[#F2F4F5] p-6 rounded-xl text-commentColor">
      <div className="flex gap-2">
        <img src={ProfileImage} alt="User" />
        <div>
          <p className="text-[#283646] font-semibold">Paul M. Williams</p>
          <p>15 December 2020, 11:40 AM</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[87%] mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
          purus viverra accumsan in nisl nisi.
        </p>
        <div className="flex gap-12 text-[#283646]">
          {commentButtons.map((button) => (
            <button className="flex items-center gap-1">
              {button.icon}{" "}
              <span className="max-md:text-sm">{button.title}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-[#F2F4F5] p-6 rounded-xl">
          <div className="flex gap-2">
            <img src={ProfileImage} alt="User" />
            <div>
              <p className="text-[#283646] font-semibold">Paul M. Williams</p>
              <p>15 December 2020, 11:40 AM</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pl-11 w-[100%]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi.
            </p>
            <div className="flex gap-12">
              {commentButtons.map((button) => (
                <button className="flex items-center gap-1 text-[#283646]">
                  {button.icon}{" "}
                  <span className="max-md:text-sm">{button.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComment;
