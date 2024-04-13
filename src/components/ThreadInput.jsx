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
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Judul"
      />
      <input
        type="text"
        value={category}
        onChange={onCategoryChange}
        placeholder="Kategori"
      />
      <textarea
        type="text"
        value={body}
        onChange={onBodyChange}
        placeholder="Masukkan konten"
      />
      <button
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
