import React from "react";

const ArticleCommentForm = () => {
  return (
    <div className="relative w-[100%]">
      <textarea
        className="w-[100%] h-[200px] text-start border-primary border-2 rounded-md p-6 resize-none"
        placeholder="Leave your comment here..."
      ></textarea>
      <button className="absolute bg-primary bottom-5 right-10 px-5 py-1 rounded-md text-white font-semibold">
        Send
      </button>
    </div>
  );
};

export default ArticleCommentForm;
