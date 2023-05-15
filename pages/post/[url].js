import React from "react";

import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  PostIngredients,
  Comments,
  CommentsForm,
  Loader,
  Print,
  DownloadPDF,
} from "../../components";

import { useRouter } from "next/router";

const PostDetails = ({ post }) => {
  const router = useRouter();
  // const isRecipie = post.categories[ 0 ].name
  // console.log({isRecipie});
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-10 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          {/* {
           isRecipie && isRecipie === 'Recipie'  && <Print />
          } */}
          <div className="flex flex-row">
            <Print post={post}/>
            <DownloadPDF post={post} />
          </div>

          <Author author={post.author} />
          <CommentsForm url={post.url} />
          <Comments url={post.url} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg-sticky top-8">
            <PostWidget
              url={post.url}
              categories={post.categories.map((category) => category.url)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.url);

  return {
    props: { post: data },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { url } }) => ({ params: { url } })),
    fallback: true,
  };
}
