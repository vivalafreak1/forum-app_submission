import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [comment, onCommentChange, setComment] = useInput('');
  const onCommentSubmit = () => {
    addComment(comment);
    setComment('');
  };
  return (
    <>
      <span className="comment_give-comment">Beri Komentar</span>
      <form className="comment_form">
        <textarea
          className="comment_form-text-area"
          value={comment}
          onChange={onCommentChange}
          rows="4"
        />
        <button type="button" className="comment_form-submit" onClick={onCommentSubmit}>Kirim</button>
      </form>
    </>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
