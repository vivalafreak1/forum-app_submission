import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form className="thread-input">
      <input
        className="thread-input__title"
        type="text"
        label="Judul"
        value={title}
        onChange={onTitleChange}
      />
      <input
        className="thread-input__category"
        type="text"
        label="Kategori"
        value={category}
        onChange={onCategoryChange}
      />
      <textarea
        className="thread-input__body"
        type="text"
        label="Masukkan konten"
        value={body}
        onChange={onBodyChange}
      />
      <button
        className="thread-input__submit"
        type="submit"
        onClick={() => addThread({ title, category, body })}
      >
        Buat Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
