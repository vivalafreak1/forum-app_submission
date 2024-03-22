import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from './ThreadItem';
import VoteButton from './VoteButton';
import postedAt from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
}) {
  return (
    <section className="comment-item">
      <div className="comment-item_container">
        <div className="comment-item_grid">
          <div className="comment-item_stack">
            <img
              className="comment-item_user-avatar"
              src={owner.avatar}
              alt="Avatar Icon"
            />
            <p className="comment-item_user-name">{owner.name}</p>
          </div>
        </div>
        <div className="comment-item_grid">
          <span className="comment-item_user-postedat">{postedAt(createdAt)}</span>
        </div>
      </div>
      <p className="comment-item_user-content">{content}</p>
      <div className="comment-item_card">
        <VoteButton
          id={id}
          authUser={authUser}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      </div>
      <div className="comment-item_divider" />
    </section>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export { commentShape };

export default CommentItem;
