"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import "~/styles/pages/blog.css";

const Blog = () => {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setPostList(sortedPosts);
    };

    getPosts();
  }, []);

  const isNewPost = (postDate) => {
    const currentDate = new Date();
    const postCreationDate = new Date(postDate);
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    return currentDate - postCreationDate < oneMonthInMilliseconds;
  };

  return (
    <>
      <div className="blog_title">
        <h1>
          <span className="ColoredLetter">N</span>ews
        </h1>
      </div>
      <div className="post_list">
        {postLists.map((post) => (
          <div className="post" key={post.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  color: "#d26600",
                  margin: 0,
                  marginRight: "8px",
                }}
              >
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <Link href={`/post?id=${post.id}`}>
                <h1 style={{ margin: 0, marginRight: "8px" }}>{post.title}</h1>
              </Link>
              {isNewPost(post.createdAt) && (
                <span style={{ color: "#d26600" }}> [New!]</span>
              )}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default function BlogPage() {
  return <Blog />;
}
