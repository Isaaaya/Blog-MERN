import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Placeholder from "../../assets/Placeholder.png";
import Skeleton from "react-loading-skeleton";

const LatestArticleCardSkeleton = () => {
  return (
    <div className="flex gap-4">
      <LazyLoadImage
        className="w-[80px] h-[80px] rounded-lg object-cover"
        src={Placeholder}
        alt="Article banner"
      />
      <div>
        <h3 className="font-semibold">{<Skeleton width={100} />}</h3>
        <p className="text-xs text-textLight">{<Skeleton width={200} />}</p>
      </div>
    </div>
  );
};

export default LatestArticleCardSkeleton;
