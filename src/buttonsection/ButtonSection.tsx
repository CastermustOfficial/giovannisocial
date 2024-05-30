import React, { useState, FC, FormEvent } from 'react';
import './ButtonSection.css';

interface ButtonSectionProps {
  addContent: (newPost: { id: number; author: string; title: string; content: string }) => void;
}

const ButtonSection: FC<ButtonSectionProps> = ({ addContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author,
      title,
      content
    };
    addContent(newPost);
    setAuthor('');
    setTitle('');
    setContent('');
    toggleModal();
  };

  return (
    <>
      <section className="button-section">
        <button className={`add-content-button ${isModalOpen ? 'hidden' : ''}`} onClick={toggleModal}>
        Nuovo Post
        </button>
      </section>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            <h2>Aggiungi Nuovo Contenuto</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome Autore:
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </label>
              <label>
                Titolo:
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Contenuto:
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </label>
              <button type="submit">Salva</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonSection;
