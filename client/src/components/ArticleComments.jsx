import React from "react";
import { ArticleComment } from "../components/index";

const ArticleComments = () => {
  return (
    <section>
      <h3 className="pb-5 font-semibold">All Comments (3)</h3>
      <div className="flex flex-col gap-8">
        {[...Array(3)].map((item) => (
          <ArticleComment />
        ))}
      </div>
    </section>
  );
};

export default ArticleComments;
