import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import Createpost from './CreatePost';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>Do you want to delete this post?</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [email, loading] = useAuth();
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');
  const [isAdminMode, setIsAdminMode] = useState(false);

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

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const openModal = (postId) => {
    setPostToDelete(postId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
    }
    closeModal();
  };

  const toggleAdminMode = () => {
    if (email === 'ramdani.lokman@gmail.com') {
      setIsAdminMode(!isAdminMode);
    }
  };

  const isAdmin = email === 'ramdani.lokman@gmail.com';
  const showAdminControls = isAdmin && isAdminMode;

  return (
    <>
      <Login isAuth={!!email} />
      <Logout isAuth={!!email} />
      <div>
        {isAdmin && (
          <button onClick={toggleAdminMode}>
            {isAdminMode ? 'View as Normal User' : 'View as Admin'}
          </button>
        )}
      </div>
      {showAdminControls && <Createpost />}
      <ConfirmModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <div>
        {postLists.map((post) => (
          <div className="post" key={post.id}>
            {showAdminControls && (
              <button onClick={() => openModal(post.id)}>delete</button>
            )}
            <Link to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <h3>@{post.author.name}</h3>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};


export default Blog;
