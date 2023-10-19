import React from "react";
import { LatestArticleCard } from "../components/index";

const LatestArticles = () => {
  const tags = [
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education",
  ];
  return (
    <div className="p-[30px] border w-[80%] mx-auto xl:w-[360px] h-fit rounded-xl shadow-lg shadow-indigo-300/60 flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h3 className="font-semibold text-xl">Latest Articles</h3>
        <div className="grid grid-cols-1 md:max-xl:grid-cols-2 gap-4">
          {[...Array(5)].map((item) => (
            <LatestArticleCard />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-xl">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button className="bg-primary text-white py-1 px-3 font-bold rounded-md">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
