import React, { useState } from 'react';
import '../styles/blog.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Createpost = () => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      createdAt: new Date().toISOString(),
    });
    handleClose();
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='inputGp'>
            <label>Title:</label>
            <input
              placeholder='Title...'
              type='text'
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className='inputGP'>
            <label> Post: </label>
            <textarea
              placeholder='text...'
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createPost}>
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Createpost;
