import React from "react";

const CommentReplyForm = ({
  setReplyContent,
  handleReply,
  createReplyLoading,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-[#F2F4F5] p-6 rounded-xl h-[200px]">
      <textarea
        onChange={(e) => setReplyContent(e.target.value)}
        className="resize-none p-2 h-[100%]"
        placeholder="Reply..."
      />
      <button
        disabled={createReplyLoading}
        onClick={handleReply}
        className="bg-textMain text-white w-content self-end w-[90px] py-1 font-semibold rounded-md disabled:cursor-not-allowed"
      >
        {createReplyLoading ? "Loading..." : "Reply"}
      </button>
    </div>
  );
};

export default CommentReplyForm;
