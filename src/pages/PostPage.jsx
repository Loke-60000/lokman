import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import YouTube from 'react-youtube';

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

  const videoId = getYouTubeVideoId(post.postText);

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      {videoId ? (
        <YouTube videoId={videoId} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: post.postText }} />
      )}
      <h3>@{post.author.name}</h3>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

const getYouTubeVideoId = (text) => {
  const regex = /https:\/\/www.youtube.com\/watch\?v=([\w-]{11})/;
  const match = text.match(regex);
  if (match) {
    return match[1];
  }
  return null;
};

export default PostPage;
