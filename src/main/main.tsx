import React, { useState, FC } from 'react';
import './Main.css';
import ButtonSection from '../buttonsection/ButtonSection';
import Post from '../post/Post';
import logo from './logo.png';

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

  const addContent = (newPost: { author: string; title: string; content: string }) => {
    const updatedPosts = [...posts, { ...newPost, id: Date.now() }];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const repostContent = (post: { author: string; title: string; content: string }) => {
    const repostedPost = {
      ...post,
      id: Date.now(),
      content: `Ripubblicato da: ${post.author}\n${post.content}`,
    };
    addContent(repostedPost);
  };

  return (
    <main className="main">
      <section className="section sticky-header">
        <img src={logo} alt="" />
        <h1></h1>
        <p><h3>CasterPOST - Orgogliosi di essere politicallyINCORRECT</h3></p>
      </section>
      <ButtonSection addContent={addContent} />
      <section className="posts-section">
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} onRepost={repostContent} />
        ))}
      </section>
    </main>
  );
};

export default Main;
