import React, { useState } from 'react';
import '../styles/blog.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Createpost = () => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [show, setShow] = useState(false);
  const [titleError, setTitleError] = useState('');

  const handleClose = () => {
    setTitle('');
    setPostText('');
    setTitleError('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const postCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    if (title.trim() === '') {
      setTitleError('Title field is required.');
      return;
    }
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      createdAt: new Date().toISOString(),
    });
    handleClose();
  };

  return (
    <div className="createPostPage">
      <h1>Create a post</h1>
      <div className="cpContainer">
        <Button variant="primary" onClick={handleShow}>
          Create Post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="submitPostBtn" variant="primary" onClick={createPost}>
              Submit Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Createpost;
