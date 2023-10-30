import { useState } from "react";
import { getExplicitCreationDate, toggleButton } from "../utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsReplyFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { CommentReplyForm, CommentReply } from "../components/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Placeholder from "../assets/Placeholder.png";
import useAxiosFunction from "../hooks/useAxiosFunction";

const ArticleComment = ({
  _id,
  commentContent,
  createdAt,
  author,
  replies,
  refetch,
}) => {
  const { articleId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const commentCreationDate = getExplicitCreationDate(createdAt);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [deleteCommentAxiosFetch, deleteCommentResponse, deleteCommentLoading] =
    useAxiosFunction();
  const [createReplyAxiosFetch, createReplyResponse, createReplyLoading] =
    useAxiosFunction();

  const handleDeleteComment = async () => {
    await deleteCommentAxiosFetch({
      method: "DELETE",
      url: `/articles/${articleId}/comment/${_id}`,
    });
    refetch();
  };

  const handleReply = async () => {
    await createReplyAxiosFetch({
      method: "POST",
      url: `/articles/${articleId}/comment/${_id}`,
      requestConfig: {
        replyContent,
      },
    });
    setIsReplyFormOpen(false);
    setReplyContent("");
    refetch();
  };

  return (
    <div className="flex w-[100%] flex-col gap-2 bg-[#F2F4F5] p-6 rounded-xl text-commentColor">
      <div className="flex gap-2">
        <LazyLoadImage
          className="w-[50px] h-[50px] rounded-full"
          src={author?.imageUrl || Placeholder}
          alt="User"
        />
        <div>
          <p className="text-[#283646] font-semibold">{author?.name}</p>
          <p>{commentCreationDate}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[87%] mx-auto">
        <p>{commentContent}</p>
        {user && (
          <div className="flex gap-12 text-[#283646]">
            <button
              onClick={() => toggleButton(isReplyFormOpen, setIsReplyFormOpen)}
              className="flex gap-1 items-center"
            >
              <BsReplyFill size={20} />
              {isReplyFormOpen ? "Cancel" : "Reply"}
            </button>
            {author?._id === user?._id && (
              <button
                onClick={handleDeleteComment}
                className="flex gap-1 items-center"
              >
                <AiOutlineDelete size={20} />
                {deleteCommentLoading ? "Loading..." : "Delete"}
              </button>
            )}
          </div>
        )}
        {replies?.map((reply) => {
          const replyCreationDate = getExplicitCreationDate(reply.createdAt);
          return (
            <CommentReply
              user={user}
              refetch={refetch}
              commentId={_id}
              key={reply?._id}
              {...reply}
              replyCreationDate={replyCreationDate}
            />
          );
        })}
        {isReplyFormOpen && (
          <CommentReplyForm
            setReplyContent={setReplyContent}
            handleReply={handleReply}
            createReplyLoading={createReplyLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleComment;
