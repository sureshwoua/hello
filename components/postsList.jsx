"use client";
import React, { useState } from "react";
import { useContext } from "react";
import styles from "./posts.module.css";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/navigation";
const PostsList = () => {
  const { posts, deletePost } = useContext(PostContext);
  const router = useRouter();
  const handleRemovePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className={styles.container}>
      {/* <FormDetails /> */}
      <button
        className={styles.button}
        type={"button"}
        onClick={() => router.push(`/user/${"add"}`)}
      >
        {"Add New Task"}
      </button>
      {posts?.length > 0 && <h1 className={styles.heading}>Task</h1>}
      {posts?.length > 0 ? (
        posts.map((post) => (
          <>
            <div key={post.id} className={styles.post}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.description}>{post.description}</p>
              <button
                className={styles.editButton}
                onClick={() => router.push(`/user/${post.id}`)}
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
          </>
        ))
      ) : (
        <h1>No posts found.</h1>
      )}
    </div>
  );
};

export default PostsList;
