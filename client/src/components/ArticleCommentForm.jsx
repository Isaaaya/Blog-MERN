import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosFunction from "../hooks/useAxiosFunction";

const ArticleCommentForm = ({ refetch }) => {
  const [commentContent, setCommentContent] = useState("");
  const { articleId } = useParams();
  const [addCommentAxiosFetch, response, loading] = useAxiosFunction();

  const handleSubmit = async () => {
    await addCommentAxiosFetch({
      method: "POST",
      url: `/articles/${articleId}/comment`,
      requestConfig: {
        commentContent,
      },
    });
    setCommentContent("");
    refetch();
  };

  return (
    <div className="relative w-[100%]">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-[100%] h-[200px] text-start border-primary border-2 rounded-md p-6 resize-none"
        placeholder="Leave your comment here..."
      ></textarea>
      <button
        onClick={handleSubmit}
        className="absolute bg-primary bottom-5 right-10 w-[100px] py-1 rounded-md text-white font-semibold"
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  );
};

export default ArticleCommentForm;
