import React, { FC, useState } from 'react';
import './Post.css';

interface PostProps {
  post: {
    id: number;
    author: string;
    title: string;
    content: string;
  };
  onDelete: (id: number) => void;
  onRepost: (post: { author: string; title: string; content: string }) => void;
}

const Post: FC<PostProps> = ({ post, onDelete, onRepost }) => {
  const [replies, setReplies] = useState<string[]>([]);
  const [reply, setReply] = useState<string>('');

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim() !== '') {
      setReplies([...replies, reply]);
      setReply('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.title}</h3>
        <h4>{post.author}</h4>
        <button className="delete-button" onClick={() => onDelete(post.id)}>
          &times;
        </button>
      </div>
      <p>{post.content}</p>
      <div className="post-actions">
        <button>
          <i className="fas fa-thumbs-up"></i> Mi piace
        </button>
        <button>
          <i className="fas fa-thumbs-down"></i> Non mi piace
        </button>
        <button>
          <i className="fas fa-share"></i> Condividi
        </button>
        <button onClick={() => onRepost(post)}>
          <i className="fas fa-retweet"></i> Ripubblica
        </button>
      </div>
      <div className="reply-section">
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Scrivi una risposta..."
            value={reply}
            onChange={handleReplyChange}
          />
          <button type="submit">Rispondi</button>
        </form>
        <div className="replies">
          {replies.map((reply, index) => (
            <p key={index}>{reply}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
