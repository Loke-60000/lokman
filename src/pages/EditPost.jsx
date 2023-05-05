import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/blog.css';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [titleError, setTitleError] = useState('');

  const postDocRef = doc(db, 'posts', postId);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setTitle(postData.title);
        setPostText(postData.postText);
      } else {
        navigate('/not-found');
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const updatePost = async () => {
    if (title.trim() === '') {
      setTitleError('Title field is required.');
      return;
    }
    await updateDoc(postDocRef, {
      title,
      postText,
    });
    navigate(`/post/${postId}`);
  };

  return (
    <div className="editPostPage">
      <h1>Edit Post</h1>
      <div className="epContainer">
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            {titleError && <div className="text-danger">{titleError}</div>}
          </Form.Group>
          <Form.Group controlId="formPost">
            <Form.Label>Post:</Form.Label>
            <ReactQuill
              className="react-quill"
              theme="snow"
              value={postText}
              onChange={setPostText}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={updatePost}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditPost;
