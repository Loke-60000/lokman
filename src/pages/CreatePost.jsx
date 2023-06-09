import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [titleError, setTitleError] = useState('');

  const createPost = async () => {
    if (title.trim() === '') {
      setTitleError('Title field is required.');
      return;
    }
    const newPost = {
      title,
      postText,
      createdAt: new Date().toISOString(),
      author: {
        name: 'Your Name', // Replace with the actual author's name
      },
    };

    await addDoc(collection(db, 'posts'), newPost);
    navigate('/lokman/blog');
  };

  return (
    <div className="createPostPage">
      <h1>Create Post</h1>
      <div className="cpContainer">
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
        <Button variant="primary" onClick={createPost}>
          Create Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
