import React from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../services/context";
import { getIngredientCategories, getIngredientPost } from "../../services";
import { PostCard, Loader, Ingredients } from "../../components";
import Image from "next/image";
import empty from "../../images/empty.png";
const IngredientPost = ({ posts }) => {
  const router = useRouter();
  const ingredientName = [];
  const ingredientImage = [];
  const postDesc = [];
  const translatedPostDec = [];
  const postsLength = posts.length;
  const { language } = useAppContext();
  posts.map((post) => {
    const singlePost = post.node.ingredientCategories;
    singlePost.map((ingredient) => {
      ingredientName.push(ingredient.name);
      ingredientImage.push(ingredient.image.url);
      postDesc.push(ingredient.description);
      translatedPostDec.push(ingredient.localizations[0].description);
    });
    return ingredientName, ingredientImage, postDesc, translatedPostDec;
  });

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {postsLength > 0 ? (
        <div className="bg-white bg-opacity-20 p-4 mb-4 rounded items-center flex flex-col">
          <div className="flex flex-col items-center">
            <img
              alt={ingredientName}
              height="100px"
              width="100px"
              className="align-middle rounded-full"
              src={ingredientImage}
            />
            <h3 className="mr-2 text-3xl font-bold">{ingredientName && ingredientName} </h3>
          </div>
          <div className="m-2">
            <p>{language === "en" ? postDesc : translatedPostDec}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center error-background p-5 rounded-md">
          <h3 className="text-3xl mb-2 text-red-800 font-bold">
            {language === "en"
              ? "There is no content yet here"
              : "Na razie nie ma tutaj zawartości"}
          </h3>
          <p className="text-xl mb-2 text-red-300">
            {language === "en"
              ? "Be patient. Feel free to check out other parts of the blog"
              : "Cierpliwości. Sprawdź inne części bloga"}
            .{" "}
          </p>
          <Image src={empty} width={400} height={500} className="block" />
        </div>
      )}

      {postsLength > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Ingredients className="w-6/12" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default IngredientPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getIngredientPost(params.url);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const ingredients = await getIngredientCategories();
    return {
      paths: ingredients.map(({ url }) => ({ params: { url } })),
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}
