import React from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";
import empty from '../../images/empty.png';
import Image from "next/image";
const CategoryPost = ({ posts }) => {
  const router = useRouter();
  const categoryName = [];
  const categoryImage = [];
  const postsLength = posts.length;
  const categoryDescription = []
  posts.map((post) => {
    const singlePost = post.node.categories;
   
    singlePost.map((category) => {
   
      categoryName.push(category.name);
      categoryImage.push(category.image.url);
      categoryDescription.push(category.categoryDescription)
      console.log({categoryImage});
    });
    return categoryName, categoryName, categoryDescription;
  });

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {postsLength > 0 ? (
        <div className="bg-white bg-opacity-20 p-4 mb-4 rounded items-center flex flex-col">
          <div className="flex flex-row items-center">
            <img
            alt={categoryName[0]}
            height="100px"
            width="100px"
            className="align-middle rounded-full"
            src={categoryImage[0]}
          />
              <h3 className="text-3xl tet">{categoryName[0]} </h3>
          </div>
          <div className="m-2">
            <p>{ categoryDescription[0] }</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center error-background p-5 rounded-md">
            <h3 className="text-3xl mb-2 text-red-800 font-bold">There is no content yet here</h3>
            <p className="text-xl mb-2 text-red-300">Be patient. Feel free to check out other parts of the blog. </p>
           <Image src={empty} width={400} height={500} className="block" />
        </div>
      )}

      {
        postsLength > 0 && (
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        
             <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8 lg:w-full">
            <Categories className="w-6/12" />
          </div>
        </div>
       
       
      </div>
        ) }
      
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.url);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const categories = await getCategories();
    return {
      paths: categories.map(({ url }) => ({ params: { url } })),
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}
