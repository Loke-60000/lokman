import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import CreatePost from './CreatePost';
import { getDocs, collection, deleteDoc, doc, addDoc } from 'firebase/firestore'; // Import Firestore functions
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

const ModeratorPage = () => {
  const [user, loading] = useAuth();
  const [postLists, setPostList] = useState([]);
  const [urlToAdd, setUrlToAdd] = useState(''); // State for adding URLs
  const [urlToDelete, setUrlToDelete] = useState(null); // State for deleting URLs
  const postCollectionRef = collection(db, 'posts');
  const [urlsToDelete, setUrlsToDelete] = useState([]);

  useEffect(() => {
    refreshPosts();
    fetchUrls(); // Fetch URLs when component mounts
  }, []);


  // Define the fetchUrls function at the top level of your component
  const fetchUrls = async () => {
    try {
      const urlsRef = collection(db, 'urls');
      const urlsSnapshot = await getDocs(urlsRef);
      const urlsData = urlsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUrlsToDelete(urlsData);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const deleteUrl = async (urlId) => {
    try {
      console.log('urlId:', urlId); // Add this line for debugging
  
      // Get a reference to the URL document
      const urlDocRef = doc(db, 'urls', urlId);
  
      // Delete the URL document
      await deleteDoc(urlDocRef);
  
      // Refresh the list of URLs
      fetchUrls();
    
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };
  

  
  
  const refreshPosts = async () => {
    const data = await getDocs(postCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPostList(sortedPosts);
  };

  useEffect(() => {
    refreshPosts();
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

  const isAdmin = user?.email === 'ramdani.lokman@gmail.com';

  // Function to handle adding URLs
  const addUrl = async () => {
    if (urlToAdd.trim() !== '') {
      try {
        const urlsRef = collection(db, 'urls');
        const newUrlDoc = await addDoc(urlsRef, { url: urlToAdd });
        // newUrlDoc.id contains the newly generated ID
        console.log('New URL ID:', newUrlDoc.id);
        setUrlToAdd(''); // Clear the input field after adding the URL
        // Refresh the list of URLs
        fetchUrls();
      } catch (error) {
        console.error('Error adding URL:', error);
      }
    }
  };


  return (
    <>
      {!user && <Login />}
      <Logout isAuth={!!user} />
      <div>
        <hr />
        <h1 className='adminTitle'>ADMIN DASHBOARD</h1>
        <hr />
      </div>
      {isAdmin && <CreatePost onPostCreated={refreshPosts} />}
      <div>
        <h1 className="adminTitle">Post created</h1>
        {postLists.map((post) => (
          <div className="post" key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <h3 className='PostInfo'>@{post.author.name}</h3>
            <p className='PostInfo'>{new Date(post.createdAt).toLocaleString()}</p>
            {isAdmin && (
              <>
                <Link to={`/edit/${post.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => openModal(post.id)}>Delete</button>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>
      <ConfirmModal isOpen={modalIsOpen} onClose={closeModal} onConfirm={confirmDelete} />

      {/* Form for adding URLs */}
      {isAdmin && (
        <div>
          <h1 className="adminTitle">URL (Illustrations)</h1>
          <h2 className='urlTitle'>Add URLs</h2>
          <input
            type="text"
            placeholder="Enter URL"
            value={urlToAdd}
            onChange={(e) => setUrlToAdd(e.target.value)}
          />
          <div className="ButtonContainerPost">
            <button className='UrlButton' onClick={addUrl}>Add URL</button>
          </div>
          <br />
          <hr />
        </div>
      )}

      {/* Form for deleting URLs */}
      {isAdmin && (
        <div>
          <h2 className='urlTitle'>Delete URLs</h2>
          <select
            className='UrldeleteSelect'
            value={urlToDelete}
            onChange={(e) => {
              setUrlToDelete(e.target.value);
              if (e.target.value) {
                deleteUrl(e.target.value);
                setUrlToDelete(''); // Clear the selected value
              }
            }}
          >
            <option value="" disabled>
              Select URL to Delete
            </option>
            {urlsToDelete.map((url) => (
              <option key={url.id} value={url.id}>
                {url.url}
              </option>
            ))}
          </select>
          <div className="ButtonContainerPost">
            <button className='UrlButton' onClick={() => deleteUrl(urlToDelete)}>Delete URL</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModeratorPage;
