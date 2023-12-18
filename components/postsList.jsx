"use client";
import React, { useState } from "react";
import { useContext } from "react";
import styles from "./posts.module.css";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/router";
import Link from "next/link";
const PostsList = () => {
  const { posts, addPost, editPost, deletePost } = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = () => {
    console.log("Button clicked!");
  };
  const handleAddPost = (e) => {
    e?.preventDefault();
    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };
    addPost(newPost);
    setTitle("");
    setDescription("");
  };

  const handleRemovePost = (postId) => {
    deletePost(postId);
  };

  const EditAPost = (postId) => {
    const post = posts.filter((post) => post.id === postId)[0];
    console.log(post);
    setTitle(post.title);
    setDescription(post.description);
    setPostId(postId);
    setIsEdit(true);
  };

  const handleEditPost = (e) => {
    e?.preventDefault();

    if (!title && !description) return;

    const updatedPost = {
      id: postId,
      title,
      description,
    };

    console.log(updatedPost.id, updatedPost);
    editPost(updatedPost.id, updatedPost);

    setTitle("");
    setDescription("");
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className={styles.button}
          type={"button"}
          onClick={() => (isEdit ? handleEditPost() : handleAddPost())}
        >
          {isEdit ? "Edit Task" : "Add New Task"}
        </button>
      </form>
      <h1 className={styles.heading}>Task</h1>
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            {/* <Link
              href={{
                pathname: "/[id]",
                // query: { name: "test" },
              }}
              className={styles.editButton}
              onClick={() => EditAPost(post.id)}
            >
              Edit
            </Link> */}
            <button
              className={styles.editButton}
              onClick={() => EditAPost(post.id)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostsList;
