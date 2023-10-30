import { useState, useEffect } from "react";
import { ArticleCard, TagsBoard, SearchArticleForm } from "../components/index";
import { Link } from "react-router-dom";
import { ArticleCardSkeleton } from "../components/skeletons/index";
import useAxiosFunction from "../hooks/useAxiosFunction";
import ReactPaginate from "react-paginate";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ArticlesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [getArticlesAxiosFetch, getArticlesResponse] = useAxiosFunction();

  const getArticles = async () => {
    await getArticlesAxiosFetch({
      url: `/articles?tag=${selectedTags.join(
        ","
      )}&search=${searchQuery}&page=${currentPage}`,
    });
  };

  useEffect(() => {
    getArticles();
  }, [selectedTags, searchQuery, currentPage]);

  useEffect(() => {
    if (!Array.isArray(getArticlesResponse)) {
      setArticles(getArticlesResponse.articles);
    }
    if (getArticlesResponse.articles?.length >= 0) setIsLoading(false);
  }, [getArticlesResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex md:flex-col max-lg:flex-col justify-between gap-7 w-[80%] mx-auto py-12">
      <SearchArticleForm
        refetch={getArticles}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex flex-col lg:flex-row max-xl:gap-10 gap-8">
        <TagsBoard
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <div className="grid max-xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-center justify-center justify-items-center">
          {articles?.length ? (
            articles.map((article) => (
              <Link key={article._id} to={`/articles/${article._id}`}>
                <ArticleCard {...article} />
              </Link>
            ))
          ) : isLoading ? (
            [...Array(6)].map((item, index) => (
              <ArticleCardSkeleton key={index} />
            ))
          ) : (
            <p>No articles yet...</p>
          )}
        </div>
      </div>
      {getArticlesResponse?.pageCount > 0 && (
        <ReactPaginate
          pageClassName={"text-primary border rounded-md py-1 px-2"}
          previousLabel={<GrFormPrevious size={20} />}
          nextLabel={<GrFormNext size={20} />}
          breakLabel={"..."}
          pageCount={getArticlesResponse?.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={(e) => setCurrentPage(e.selected + 1)}
          containerClassName={"flex gap-3 justify-center items-center"}
          activeClassName={"border-primary border-2"}
          previousClassName={`hover:bg-primary/[0.3] rounded-full p-1 ${
            currentPage === 1 && "hidden"
          }`}
          nextClassName={`hover:bg-primary/[0.3] rounded-full p-1 ${
            currentPage === getArticlesResponse?.pageCount && "hidden"
          }`}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
