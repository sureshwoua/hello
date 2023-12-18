"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import styles from "./posts.module.css";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/navigation";
const FormDetails = ({ productId }) => {
  const { posts, addPost, editPost } = useContext(PostContext);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const post = posts?.filter((post) => post.id == productId)?.[0];
    setTitle(post?.title);
    setDescription(post?.description);
    setPostId(post?.id);
  }, []);
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
    router.push(`/`);
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
    router.push(`/`);
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
          onClick={() =>
            productId !== "add" ? handleEditPost() : handleAddPost()
          }
        >
          {productId !== "add" ? "Edit Task" : "Add New Task"}
        </button>
      </form>
    </div>
  );
};

export default FormDetails;
