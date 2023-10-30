import React from "react";
import Skeleton from "react-loading-skeleton";
import { MdVerified } from "react-icons/md";
import Placeholder from "../../assets/Placeholder.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ArticleCardSkeleton = () => {
  return (
    <div className="flex flex-col w-[310px] rounded-xl shadow-lg text-textMain max-md:w-[330px] overflow-hidden">
      <LazyLoadImage
        className="w-[100%] h-[200px] object-cover"
        src={Placeholder}
        alt="Article banner"
      />
      <div className="p-8 flex flex-col gap-5">
        <h3 className="text-3xl font-semibold">{<Skeleton width={100} />}</h3>
        <p className="text-lg">{<Skeleton width={100} />}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-full w-[50px] h-[50px]">
              <LazyLoadImage
                className="w-[50px] h-[50px] object-cover"
                src={Placeholder}
                alt="User"
              />
            </div>
            <div>
              <p>{<Skeleton width={100} />}</p>
              <div className="flex items-center gap-[2px] ">
                <MdVerified size={20} className="text-green-600" />
                <p className="text-sm">Verified writer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
