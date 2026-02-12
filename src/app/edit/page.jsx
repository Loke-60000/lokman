"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "~/lib/firebase-config";
import { Form } from "react-bootstrap";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const postDocRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setTitle(postData.title);
        setPostText(postData.postText);
      } else {
        router.push("/not-found");
      }
    };

    if (postId) fetchPost();
  }, [postId, router]);

  const updatePost = async () => {
    if (title.trim() === "") {
      setTitleError("Title field is required.");
      return;
    }
    const postDocRef = doc(db, "posts", postId);
    await updateDoc(postDocRef, {
      title,
      postText,
    });
    router.push(`/post?id=${postId}`);
  };

  if (!postId) {
    return <div>Missing post id.</div>;
  }

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
        <button className="btn btn-primary" onClick={updatePost}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default function EditPostPage() {
  return <EditPost />;
}
