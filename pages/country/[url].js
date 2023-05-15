import React from "react";
import { useRouter } from "next/router";

import { getCountries, getCountryPost } from "../../services";
import { PostCard, Loader, Countries } from "../../components";
import Image from "next/image";
import empty from '../../images/empty.png';
const CountryPost = ({ posts }) => {
  const router = useRouter();
  const countryName = [];
  const countryImage = [];
  const countryDescription = [];
  const postsLength = posts.length;
  posts.map((post) => {
    const singlePost = post.node.countries;
    singlePost.map((country) => {
      countryName.push(country.name);
      countryImage.push(country.image.url);
      countryDescription.push(country.countryDescription);
    });
    return countryName, countryImage, countryDescription;
  });

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {postsLength > 0 ? (
        <div>
          <h3>{countryName && countryName} </h3>
          <img
            alt={countryName}
            height="100px"
            width="100px"
            className="align-middle rounded-full"
            src={countryImage}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center error-background p-5 rounded-md">
          <h3 className="text-3xl mb-2 text-red-800 font-bold">
            There is no content yet here
          </h3>
          <p className="text-xl mb-2 text-red-300">
            Be patient. Feel free to check out other parts of the blog.{" "}
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
              <Countries />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CountryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCountryPost(params.url);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const countires = await getCountries();
    return {
      paths: countires.map(({ url }) => ({ params: { url } })),
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
}
