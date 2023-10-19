import React from "react";
import ArticleImage from "../assets/posts/post1.jpg";
import {
  ArticleCommentForm,
  ArticleComments,
  LatestArticles,
} from "../components";

const ArticleDetailsPage = () => {
  return (
    <div className="flex w-[80%] max-xl:w-[100%] mx-auto justify-between max-xl:flex-col py-[50px]">
      <div className="py-[40px] flex flex-col gap-6 items-center w-[60%] max-lg:w-[80%] mx-auto">
        <img
          className="rounded-xl w-full"
          src={ArticleImage}
          alt="Article banner"
        />
        <div className="flex flex-col gap-5">
          <p className="uppercase tracking-widest text-primary">Education</p>
          <h4 className="text-2xl font-semibold">
            Help children get better education
          </h4>
          <p className="whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
            rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed
            euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
            Mattis pellentesque id nibh tortor id aliquet lectus proin. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Egestas purus
            viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
            rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed
            euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
            rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed
            euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
            Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien
            faucibus et molestie ac feugiat sed lectus vestibulum.
          </p>
        </div>
        <ArticleCommentForm />
        <ArticleComments />
      </div>
      <LatestArticles />
    </div>
  );
};

export default ArticleDetailsPage;
