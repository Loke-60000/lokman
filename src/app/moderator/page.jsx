"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logout from "~/components/Logout";
import useAuth from "~/hooks/useAuth";
import "~/styles/pages/blog.css";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import dynamic from "next/dynamic";
import { Form } from "react-bootstrap";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

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

const CreatePostInline = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [titleError, setTitleError] = useState("");

  const createPost = async () => {
    if (title.trim() === "") {
      setTitleError("Title field is required.");
      return;
    }
    const newPost = {
      title,
      postText,
      createdAt: new Date().toISOString(),
      author: { name: "Lokman" },
    };
    await addDoc(collection(db, "posts"), newPost);
    setTitle("");
    setPostText("");
    setTitleError("");
    if (onPostCreated) onPostCreated();
  };

  return (
    <div className="createPostPage">
      <h1 className="adminTitle">Create Post</h1>
      <div className="cpContainer">
        <Form>
          <Form.Group controlId="formTitle">
            <br />
            <Form.Control
              className="titlePostInput"
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
        <div className="ButtonContainerPost">
          <button className="CreatePostButton" onClick={createPost}>
            Create Post
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
};

const ModeratorPage = () => {
  const [user, loading] = useAuth();
  const [postLists, setPostList] = useState([]);
  const [urlToAdd, setUrlToAdd] = useState("");
  const [urlToDelete, setUrlToDelete] = useState(null);
  const postCollectionRef = collection(db, "posts");
  const [urlsToDelete, setUrlsToDelete] = useState([]);

  useEffect(() => {
    refreshPosts();
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const urlsRef = collection(db, "urls");
      const urlsSnapshot = await getDocs(urlsRef);
      const urlsData = urlsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUrlsToDelete(urlsData);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const deleteUrl = async (urlId) => {
    try {
      const urlDocRef = doc(db, "urls", urlId);
      await deleteDoc(urlDocRef);
      fetchUrls();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const refreshPosts = async () => {
    const data = await getDocs(postCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    setPostList(sortedPosts);
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    refreshPosts();
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

  const isAdmin = user?.email === "ramdani.lokman@gmail.com";

  const addUrl = async () => {
    if (urlToAdd.trim() !== "") {
      try {
        const urlsRef = collection(db, "urls");
        await addDoc(urlsRef, { url: urlToAdd });
        setUrlToAdd("");
        fetchUrls();
      } catch (error) {
        console.error("Error adding URL:", error);
      }
    }
  };

  return (
    <>
      {!user && (
        <div className="login_page">
          <h1>Please log in to access this page</h1>
        </div>
      )}
      <Logout isAuth={!!user} />
      <div>
        <hr />
        <h1 className="adminTitle">ADMIN DASHBOARD</h1>
        <hr />
      </div>
      {isAdmin && <CreatePostInline onPostCreated={refreshPosts} />}
      <div>
        <h1 className="adminTitle">Post created</h1>
        {postLists.map((post) => (
          <div className="post" key={post.id}>
            <Link href={`/post?id=${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <h3 className="PostInfo">@{post.author.name}</h3>
            <p className="PostInfo">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            {isAdmin && (
              <>
                <Link href={`/edit?postId=${post.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => openModal(post.id)}>Delete</button>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      {isAdmin && (
        <div>
          <h1 className="adminTitle">URL (Illustrations)</h1>
          <h2 className="urlTitle">Add URLs</h2>
          <input
            type="text"
            placeholder="Enter URL"
            value={urlToAdd}
            onChange={(e) => setUrlToAdd(e.target.value)}
          />
          <div className="ButtonContainerPost">
            <button className="UrlButton" onClick={addUrl}>
              Add URL
            </button>
          </div>
          <br />
          <hr />
        </div>
      )}

      {isAdmin && (
        <div>
          <h2 className="urlTitle">Delete URLs</h2>
          <select
            className="UrldeleteSelect"
            value={urlToDelete || ""}
            onChange={(e) => {
              setUrlToDelete(e.target.value);
              if (e.target.value) {
                deleteUrl(e.target.value);
                setUrlToDelete("");
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
            <button
              className="UrlButton"
              onClick={() => deleteUrl(urlToDelete)}
            >
              Delete URL
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function ModeratorPageRoute() {
  return <ModeratorPage />;
}
