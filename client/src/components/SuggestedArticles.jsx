import { useState, useEffect } from "react";
import { ArticleCard } from "./index";
import { ArticleCardSkeleton } from "./skeletons/index";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAxiosFunction from "../hooks/useAxiosFunction";

const SuggestedArticles = () => {
  const [getUserArticlesAxiosFetch, { articles }] = useAxiosFunction();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserArticlesAxiosFetch({
      url: "/articles",
    });
  }, []);

  useEffect(() => {
    if (articles?.length >= 0) setIsLoading(false);
  }, [articles]);

  return (
    <section className="w-[80%] mx-auto">
      <div className="grid max-xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-center justify-items-center mt-[50px]">
        {articles?.length ? (
          articles.map((article) => (
            <Link key={article._id} to={`/articles/${article._id}`}>
              <ArticleCard {...article} />
            </Link>
          ))
        ) : isLoading ? (
          [...Array(6)].map((_, index) => <ArticleCardSkeleton key={index} />)
        ) : (
          <p>No articles yet...</p>
        )}
      </div>
      <Link to="/articles">
        <button className="flex items-center mx-auto my-[50px] border-[2.5px] px-6 py-[3px] rounded-lg border-primary text-primary font-semibold">
          More articles <BsArrowRightShort size={30} />
        </button>
      </Link>
    </section>
  );
};

export default SuggestedArticles;
