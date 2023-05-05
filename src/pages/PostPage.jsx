import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, collection, query, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  

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

    const fetchComments = async () => {
      try {
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', id));
        const commentsData = await getDocs(commentsQuery);
        setComments(commentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!authorName.trim() || !commentText.trim()) {
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        postId: id,
        authorName,
        commentText,
        createdAt: new Date().toISOString(),
      });
      setAuthorName('');
      setCommentText('');
      fetchComments(); // refetch comments to update the list
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.postText }} />
      <h3>@{post.author.name}</h3>
      <p>{new Date(post.createdAt).toLocaleString()}</p>

      <div className="comments-section">
        <h2>Comments</h2>
    <form onSubmit={handleSubmitComment}>
      <div className="form-group">
        <label htmlFor="authorName">Name:</label>
        <input
          type="text"
          className="form-control"
          id="authorName"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="commentText">Comment:</label>
        <textarea
          className="form-control"
          id="commentText"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>

    <div className="comments-list">
  {comments.map((comment) => (
    <div className="comment" key={comment.id}>
      <div className="comment-header">
        <span className="comment-author">{comment.authorName}</span>
        <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      <div className="comment-body">{comment.commentText}</div>
    </div>
  ))}
</div>
  </div>
</div>
);
};

export default PostPage;
