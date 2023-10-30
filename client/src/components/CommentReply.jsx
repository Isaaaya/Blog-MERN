import React from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Placeholder from "../assets/Placeholder.png";
import useAxiosFunction from "../hooks/useAxiosFunction";

const CommentReply = ({
  replyCreationDate,
  _id,
  replyContent,
  author,
  commentId,
  refetch,
  user,
}) => {
  const { articleId } = useParams();
  const [deleteReplyAxiosFetch, response, loading] = useAxiosFunction();

  const handleDelete = async () => {
    await deleteReplyAxiosFetch({
      method: "DELETE",
      url: `/articles/${articleId}/comment/${commentId}/replies/${_id}`,
    });
    refetch();
  };

  return (
    <div className="flex flex-col gap-2 bg-[#F2F4F5] p-6 rounded-xl">
      <div className="flex gap-2">
        <LazyLoadImage
          className="min-w-[50px] max-w-[50px] h-[50px] rounded-full"
          src={author?.imageUrl || Placeholder}
          alt="User"
        />
        <div>
          <p className="text-[#283646] font-semibold">{author?.name}</p>
          <p>{replyCreationDate}</p>
        </div>
        {user?._id === author?._id && (
          <button onClick={handleDelete} className="ml-10">
            {loading ? "Loading..." : "Delete"}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2 pl-11 w-[100%]">
        <p>{replyContent}</p>
      </div>
    </div>
  );
};

export default CommentReply;
