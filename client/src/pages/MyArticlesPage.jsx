import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ArticleCard } from "../components/index";
import { Link, Navigate } from "react-router-dom";
import useAxiosFunction from "../hooks/useAxiosFunction";
import { ArticleCardSkeleton } from "../components/skeletons/index";

const MyArticlesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);
  const [getUserArticlesAxiosFetch, userArticles] = useAxiosFunction();

  useEffect(() => {
    if (user) {
      getUserArticlesAxiosFetch({
        url: "/users/profile/articles",
      });
    }
  }, [user]);

  useEffect(() => {
    if (userArticles?.length >= 0) setIsLoading(false);
  }, [userArticles]);

  if (!user?._id) return <Navigate to="/" />;
  else
    return (
      <div className="grid max-xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-center justify-items-center py-10">
        {isLoading ? (
          [...Array(6)].map((item, index) => (
            <ArticleCardSkeleton key={index} />
          ))
        ) : userArticles?.length > 0 ? (
          userArticles.map((article) => (
            <Link key={article._id} to={`/articles/${article._id}`}>
              <ArticleCard {...article} />
            </Link>
          ))
        ) : (
          <p>No articles yet...</p>
        )}
      </div>
    );
};

export default MyArticlesPage;
