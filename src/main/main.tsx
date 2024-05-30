import React, { useState, useEffect, FC } from 'react';
import './main.css';
import ButtonSection from '../buttonsection/buttonsection';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
}

const Main: FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const addContent = (newPost: Post) => {
    const updatedPosts = [...posts, { ...newPost, id: Date.now() }];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <main className="main">
      <section className="section">
        <h1>CasterPOST</h1>
        <p>L'unica zona PoliticallyIncorrect</p>
      </section>
      <ButtonSection addContent={addContent} />
      <section className="posts-section">
        {posts.map((post, index) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <button className="delete-button" onClick={() => deletePost(post.id)}>&times;</button>
              <h3>{post.title}</h3>
              <h4>by {post.author}</h4>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Main;
