import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

const Blog = () => {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(sortedPosts);
      setPostList(sortedPosts);
    };

    getPosts();
  }, []);

  return (
    <div>
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
          </Link>
          <h3>@{post.author.name}</h3>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Blog;
