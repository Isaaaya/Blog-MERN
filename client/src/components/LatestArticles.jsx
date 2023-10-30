import { LatestArticleCard } from "../components/index";
import { LatestArticleCardSkeleton } from "./skeletons/index";
import { latestArticlesTags } from "../constants";
import useAxios from "../hooks/useAxios";

const LatestArticles = () => {
  const [{ articles }] = useAxios({
    method: "GET",
    url: "http://localhost:5001/api/articles",
  });

  return (
    <div className="p-[30px] border w-[80%] mx-auto xl:w-[360px] h-fit rounded-xl shadow-lg shadow-indigo-300/60 flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h3 className="font-semibold text-xl">Latest Articles</h3>
        <div className="grid grid-cols-1 md:max-xl:grid-cols-2 gap-4">
          {articles?.length
            ? articles
                .slice(0, 5)
                .map((article) => (
                  <LatestArticleCard key={article?._id} {...article} />
                ))
            : [...Array(5)].map((item, index) => (
                <LatestArticleCardSkeleton key={index} />
              ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-xl">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {latestArticlesTags.map((tag) => (
            <button
              key={tag}
              className="bg-primary text-white py-1 px-3 font-bold rounded-md"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
