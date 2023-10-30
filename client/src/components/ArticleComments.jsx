import React from "react";
import { ArticleComment } from "../components/index";

const ArticleComments = ({ comments, refetch }) => {
  return (
    <section className="w-[100%]">
      <h3 className="pb-5 font-semibold text-center">
        {comments?.length > 0
          ? `All Comments (${comments?.length})`
          : "No comments yet..."}
      </h3>
      <div className="flex flex-col gap-8">
        {comments?.map((comment) => (
          <ArticleComment refetch={refetch} key={comment?._id} {...comment} />
        ))}
      </div>
    </section>
  );
};

export default ArticleComments;
