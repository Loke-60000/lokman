"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import { Form } from "react-bootstrap";
import "~/styles/pages/blog.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePost = ({ onPostCreated }) => {
  const router = useRouter();
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
      author: {
        name: "Lokman",
      },
    };

    await addDoc(collection(db, "posts"), newPost);
    if (onPostCreated) onPostCreated();
    router.push("/");
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

export default function CreatePostPage() {
  return <CreatePost />;
}
