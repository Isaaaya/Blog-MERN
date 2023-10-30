import React from "react";
import { getMinimalisticCreationDate } from "../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Placeholder from "../assets/Placeholder.png";

const LatestArticleCard = ({ title, imageUrl, createdAt }) => {
  const creationDate = getMinimalisticCreationDate(createdAt);
  return (
    <div className="flex gap-4">
      <LazyLoadImage
        className="w-[80px] h-[80px] rounded-lg object-cover"
        src={imageUrl || Placeholder}
        alt="Article banner"
      />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs text-textLight">{creationDate}</p>
      </div>
    </div>
  );
};

export default LatestArticleCard;
