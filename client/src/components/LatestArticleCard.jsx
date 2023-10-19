import React from "react";
import ArticleImage from "../assets/posts/post1.jpg";

const LatestArticleCard = () => {
  return (
    <div className="flex gap-6">
      <img
        className="w-[80px] h-[80px] rounded-lg"
        src={ArticleImage}
        alt="Article banner"
      />
      <div>
        <h3 className="font-semibold">Help children get better education</h3>
        <p className="text-xs">Jun 27, 2022</p>
      </div>
    </div>
  );
};

export default LatestArticleCard;
