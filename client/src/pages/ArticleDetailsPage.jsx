import {
  ArticleCommentForm,
  ArticleComments,
  LatestArticles,
} from "../components";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";
import { getExplicitCreationDate } from "../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Placeholder from "../assets/Placeholder.png";
import Skeleton from "react-loading-skeleton";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";

const ArticleDetailsPage = () => {
  const { user } = useSelector((store) => store.auth);
  const { articleId } = useParams();

  const [article, error, loading, refetch] = useAxios({
    url: `http://localhost:5001/api/articles/${articleId}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-[80%] max-xl:w-[100%] mx-auto justify-between max-xl:flex-col pb-[30px]">
      <div className="py-[40px] flex flex-col gap-6 items-center w-[60%] max-lg:w-[80%] mx-auto">
        <div className="w-[100%] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LazyLoadImage
              className="w-[50px] h-[50px] rounded-full"
              src={article?.author?.imageUrl || Placeholder}
              alt="User avatar"
            />
            <div>
              <p className="text-lg text-textMain">
                {article?.author?.name || <Skeleton width={70} />}
              </p>
              <p className="text-sm text-textLight">
                {(article?.createdAt &&
                  getExplicitCreationDate(article?.createdAt)) || (
                  <Skeleton width={200} />
                )}
              </p>
            </div>
          </div>
          {user?._id === article?.author?._id && (
            <Link className="self-end" to={`/articles/${article?._id}/edit`}>
              <button className="w-fit hover:bg-primary/[0.3] rounded-full p-2">
                <GrEdit size={25} />
              </button>
            </Link>
          )}
        </div>
        <LazyLoadImage
          className="rounded-xl h-[500px] object-cover"
          src={article?.imageUrl || Placeholder}
          alt="Article banner"
        />
        <div className="flex flex-col gap-5 self-start">
          <div className="flex gap-4">
            {article?.tags?.map((tag) => (
              <p key={tag} className="uppercase tracking-widest text-primary">
                {tag}
              </p>
            )) || <Skeleton width={200} />}
          </div>
          <h4 className="text-3xl font-semibold">
            {article?.title || <Skeleton />}
          </h4>
          {article?.content ? (
            <div
              className="mt-[20px]"
              dangerouslySetInnerHTML={{ __html: article?.content }}
            />
          ) : (
            <Skeleton width="200%" count={5} />
          )}
        </div>
        {user && <ArticleCommentForm refetch={refetch} />}
        <ArticleComments refetch={refetch} comments={article?.comments} />
      </div>
      <LatestArticles />
    </div>
  );
};

export default ArticleDetailsPage;
