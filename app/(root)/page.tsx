import React from "react";
import { currentUser } from "@clerk/nextjs";

import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const user = await currentUser();

  //for fetching created threads post it to home screen
  const result = await fetchPosts(1, 30);

  //console.log(result); only show in vs code terminal cause it is called from server

  return (
    <>
      <h1 className="text-left head-text">Home</h1>

      <section className="flex flex-col gap-8 mt-7 ">
        {result.posts.length === 0 ? (
          <p className="no-result">No threats found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
