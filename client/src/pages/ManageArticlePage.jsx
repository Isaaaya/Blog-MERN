import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageUpload } from "../components/index";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { availableTags, modules } from "../constants";
import useAxiosFunction from "../hooks/useAxiosFunction";
import { useSelector } from "react-redux";

const ManageArticlePage = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { articleId } = useParams();
  const articleTags = [];
  const [article, setArticle] = useState({
    title: "",
    description: "",
    content: "",
    tags: articleTags,
    imageUrl: "",
  });
  const [createArticleAxiosFetch, createArticleResponse, createArticleLoading] =
    useAxiosFunction();
  const [updateArticleAxiosFetch, updateArticleResponse, updateArticleLoading] =
    useAxiosFunction();
  const [getArticleDetailsAxiosFetch, getArticleDetailsResponse] =
    useAxiosFunction();
  const [deleteArticleAxiosFetch] = useAxiosFunction();

  useEffect(() => {
    if (articleId && user)
      getArticleDetailsAxiosFetch({
        url: `/articles/${articleId}`,
      });
  }, []);

  useEffect(() => {
    if (!Array.isArray(getArticleDetailsResponse)) {
      setArticle(getArticleDetailsResponse);
    }
  }, [getArticleDetailsResponse]);

  const handleSubmit = async () => {
    if (articleId) {
      updateArticleAxiosFetch({
        method: "PUT",
        url: `/articles/${articleId}`,
        requestConfig: article,
      });
    } else {
      createArticleAxiosFetch({
        method: "POST",
        url: "/articles/create",
        requestConfig: article,
      });
    }
  };

  useEffect(() => {
    if (updateArticleResponse?._id) {
      navigate(`/articles/${updateArticleResponse._id}`);
    }
  }, [updateArticleResponse]);

  useEffect(() => {
    if (createArticleResponse?._id) {
      navigate(`/articles/${createArticleResponse._id}`);
    }
  }, [createArticleResponse]);

  const handleDelete = async () => {
    await deleteArticleAxiosFetch({
      method: "DELETE",
      url: `/articles/${articleId}`,
    });
    navigate("/");
  };

  const handleTagSelect = (tag) => {
    if (article?.tags?.includes(tag)) {
      const filteredTags = article.tags.filter(
        (articleTag) => articleTag !== tag
      );
      setArticle({ ...article, tags: filteredTags });
    } else setArticle({ ...article, tags: [...article.tags, tag] });
  };

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  if (!user) return <Navigate to="/" />;
  else
    return (
      <div className="w-[70%] mx-auto flex flex-col gap-3 items-center py-[50px]">
        {articleId && (
          <button
            onClick={handleDelete}
            className="self-end p-2 rounded-full hover:bg-red-500/[0.3]"
          >
            <RiDeleteBin6Line size={25} />
          </button>
        )}
        <ImageUpload value={article} setValue={setArticle} />
        <input
          value={article?.title}
          onChange={handleChange}
          className="w-[100%] border px-3 py-1 rounded-md"
          type="text"
          placeholder="Title"
          name="title"
        />
        <input
          value={article?.description}
          onChange={handleChange}
          className="w-[100%] border px-3 py-1 rounded-md"
          type="text"
          placeholder="Description"
          name="description"
        />
        <div className="h-[300px]">
          <ReactQuill
            className="w-[100%] h-[100%]"
            value={article.content}
            modules={modules}
            onChange={(newValue) =>
              setArticle({ ...article, content: newValue })
            }
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-[80px]">
          {availableTags.map((tag) => (
            <button
              onClick={() => handleTagSelect(tag)}
              key={tag}
              className={`border-2 text-primary rounded-lg px-2 py-1 ${
                article?.tags &&
                article?.tags?.includes(tag) &&
                "border-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          disabled={createArticleLoading || updateArticleLoading}
          onClick={handleSubmit}
          className="bg-primary text-white font-semibold w-[100%] py-1 rounded-md disabled:bg-blue-900 disabled:cursor-not-allowed"
        >
          {createArticleLoading || updateArticleLoading
            ? "Loading..."
            : articleId
            ? "Edit"
            : "Create"}
        </button>
      </div>
    );
};

export default ManageArticlePage;
