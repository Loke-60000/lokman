"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import "~/styles/pages/blog.css";

const PostPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const postData = await getDoc(postDoc);
        if (postData.exists()) {
          setPost({ ...postData.data(), id: postData.id });
        } else {
          console.error("No post found with the given id:", id);
        }
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (!id) {
    return <div>Missing post id.</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <p>{new Date(post.createdAt).toLocaleString()}</p>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.postText }} />
    </div>
  );
};

export default function PostPageRoute() {
  return <PostPage />;
}
