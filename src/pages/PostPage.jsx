import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, collection, where, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import useAuth from '../hooks/useAuth';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [user, loading] = useAuth();

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
    <>
      <div className="post-page">
        <p>{new Date(post.createdAt).toLocaleString()}</p>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.postText }} />
        {/* <h3>@{post.author.name}</h3> */}
      </div>
    </>

  );
};

export default PostPage;
