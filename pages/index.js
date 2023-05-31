import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  PostCard,
  Categories,
  PostWidget,
  Countries,
  Ingredients,
} from "../components";
import { getPosts } from "../services";

export default function Home ({ posts }) {

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Monica's Oven - Bread & Pastries Baking Blog</title>
      </Head>
      {/* <div className="flex flex-col"> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 gap-12 sm:flex sm:flex-col sm:w-full"> */}
      <div className="lg:flex lg:flex-row lg:w-full sm:flex sm:flex-col sm:w-full">
        {/* <div className="lg:col-span-8 col-span-1"> */}
        <div className="lg:mr-8">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="">
          {/* <div className="lg:sticky relative top-8"> */}
          <div className="">
            <PostWidget />
          </div>
          <div className="lg:hidden sm:visible">
            <Categories />
          </div>
          <div className="lg:hidden sm:visible">
            <Ingredients />
          </div>
          <div className="lg:hidden sm:visible">
            <Countries />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
