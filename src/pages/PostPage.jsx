import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, 'posts', id);
        const postData = await getDoc(postDoc);
        if (postData.exists()) {
          console.log('Post data:', postData.data());
          setPost({ ...postData.data(), id: postData.id });
        } else {
          console.error('No post found with the given id:', id);
        }
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };
  
    fetchPost();
  }, [id]);
  

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.postText}</p>
      <h3>@{post.author.name}</h3>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostPage;
