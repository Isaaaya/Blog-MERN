import React from "react";
import { ArticleCard } from "../components/index";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const Articles = () => {
  const articles = [...Array(9)];
  return (
    <section className="w-[80%] mx-auto">
      <div className="grid max-xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-center justify-items-center mt-[50px]">
        {articles.map((article, index) => (
          <Link key={index} to="/articles/:articleId">
            <ArticleCard />
          </Link>
        ))}
      </div>
      <button className="flex items-center mx-auto my-[50px] border-[2.5px] px-6 py-[3px] rounded-lg border-primary text-primary font-semibold">
        More articles <BsArrowRightShort size={30} />
      </button>
    </section>
  );
};

export default Articles;
