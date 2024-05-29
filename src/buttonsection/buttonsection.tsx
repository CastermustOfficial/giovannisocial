import React, { useState } from 'react';
import './ButtonSection.css';

const ButtonSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <section className="button-section">
        <button className="add-content-button" onClick={toggleModal}>
          Aggiungi Contenuto
        </button>
      </section>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            <h2>Aggiungi Nuovo Contenuto</h2>
            <form>
              <label>
                Nome Autore:
                <input type="text" name="author" />
              </label>
              <label>
                Titolo:
                <input type="text" name="title" />
              </label>
              <label>
                Contenuto:
                <textarea name="content"></textarea>
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
